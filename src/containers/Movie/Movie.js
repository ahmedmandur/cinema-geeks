import React, { Component } from "react";
import Helmet from "react-helmet";

import { fetchMovie } from "../../services/api";
import { config } from "../../configs/tmdbConfig";
import { moneySpace, convertMinsToHrsMins } from "../../Utils/shared";
import CreditList from "../../components/Movies/Cradits/CreditList/CreditList";
import Recommendations from "../../components/Movies/Recommendations/Recommendations";
import ImagesList from "../../components/Movies/ImagesList/ImegesList";
import MovieTrailers from "../../components/Movies/MovieTrailers/MovieTrailers";

export default class Movie extends Component {
  state = {
    isFetched: false,
    movie: null
  };

  async componentDidMount() {
    await fetchMovie(this.props.match.params.movieId).then(res => {
      this.setState({ movie: res.data, isFetched: true });
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.movieId !== this.props.match.params.movieId) {
      this.setState({ isFetched: false });
      await fetchMovie(this.props.match.params.movieId).then(res => {
        this.setState({ movie: res.data, isFetched: true });
      });
    }
  }

  render() {
    if (!this.state.isFetched) return <div className="loading-box" />;

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.state.movie.title} | Cinema Geeks</title>
        </Helmet>

        <div className="movie-single">
          <div className="movie-single-inner">
            <div
              className={`movie-rating ${this.state.movie.vote_average >= 7 &&
                "movie-rating-positive"}`}>
              {this.state.movie.vote_average}
            </div>
            <div className="movie-poster">
              <img
                src={`${config.API_IMAGE.medium}/${
                  this.state.movie.poster_path
                }`}
                onLoad={this.imageLoaded}
                alt={this.state.movie.title}
              />
            </div>
            <div className="movie-details">
              <div className="movie-title">
                <span>Title:</span>
                {this.state.movie.title}
              </div>
              {this.state.movie.overview ? (
                <div className="movie-description">
                  <span>Overview:</span>
                  {this.state.movie.overview}
                </div>
              ) : (
                ""
              )}
              {this.state.movie.release_date ? (
                <div className="movie-item">
                  <span>Release date:</span>
                  {this.state.movie.release_date}
                </div>
              ) : (
                ""
              )}
              {this.state.movie.budget ? (
                <div className="movie-item">
                  <span>Budget:</span>$ {moneySpace(this.state.movie.budget)}
                </div>
              ) : (
                ""
              )}
              {this.state.movie.revenue ? (
                <div className="movie-item">
                  <span>Revenue:</span>$ {moneySpace(this.state.movie.revenue)}
                </div>
              ) : (
                ""
              )}
              <div className="movie-item">
                <span>Duration:</span>
                {convertMinsToHrsMins(this.state.movie.runtime)}
              </div>
              <ul className="movie-genres">
                {this.state.movie.genres &&
                  this.state.movie.genres.map(item => {
                    return <li key={item.id}>{item.name}</li>;
                  })}
              </ul>
              <CreditList movId={this.props.match.params.movieId} />

              <ImagesList
                title={this.state.movie.title}
                movId={this.props.match.params.movieId}
              />

              <MovieTrailers
                title={this.state.movie.title}
                movId={this.props.match.params.movieId}
              />
            </div>
          </div>
        </div>
        <Recommendations movId={this.props.match.params.movieId} />
      </React.Fragment>
    );
  }
}
