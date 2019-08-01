import React from "react";
import history from "../../history";
import MoviesList from "../../components/Movies/MoviesList/MoviesList";
import Helmet from "react-helmet";
import Spinner from "../../components/Ui/Spinner/Spinner";
import { fetchMoviesListSearch, fetchGenres } from "../../services/api";
class Search extends React.Component {
  state = {
    isLoading: false,
    results: {},
    totalResults: 0,
    activePage: 0,
    genresList: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.fetchData(1);
    }
  }

  componentDidMount() {
    this.fetchData(1);
  }

  fetchData = page => {
    fetchGenres().then(res => {
      this.setState({ genresList: res.data });
    });

    fetchMoviesListSearch(this.props.query, page).then(res => {
      this.setState({
        results: res.data.results,
        totalResults: res.data.total_results,
        activePage: page
      });
    });
  };

  handleSelectedPageChanged = page => {
    history.push(`/search/${this.props.query}/${page}`);
    this.fetchData(page);
  };

  render() {
    return (
      <div className="movies">
        <Helmet>
          <title>Search Term '{this.props.query}' - Cinema Geeks</title>
        </Helmet>

        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <MoviesList
            movies={this.state.results}
            selectedPageChanged={ev => this.handleSelectedPageChanged(ev)}
            activePage={this.state.activePage}
            totalResults={this.state.totalResults}
            genres={this.state.genresList}
          />
        )}
      </div>
    );
  }
}

export default Search;
