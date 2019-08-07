import React, { Component } from "react";
import { fetchTrailers } from "../../../services/api";
import { PhotoSwipeGallery } from "react-photoswipe";
import "react-photoswipe/lib/photoswipe.css";
import YoutubeModal from "react-youtube-modal";

import { config } from "../../../configs/tmdbConfig";

class MovieTrailers extends Component {
  state = {
    isFetched: false,
    trailers: null,
    showPopup: false
  };

  componentDidMount() {
    this.LoadMovieTrailers(this.props.movId);
  }

  LoadMovieTrailers(movieId) {
    fetchTrailers(movieId).then(res => {
      this.setState({ trailers: res.data.youtube, isFetched: true });
    });
  }

  imageLoaded = e => {
    e.target.classList.add("img-loaded");
  };

  getThumbnailContent = item => {
    return (
      <YoutubeModal videoId={item.vId}>
        <img
          src={item.thumbnail}
          onLoad={this.imageLoaded}
          alt={this.props.title}
        />
      </YoutubeModal>
    );
  };

  thumbClicked = e => {
    e.close();
  };

  render() {
    if (!this.state.isFetched)
      return (
        <div className="movies-list-container">
          <div className="loading-box" />
        </div>
      );

    let backdrops = this.state.trailers.map(image => ({
      src: `${config.API_YOUTUBE_THUMB.replace("{vidId}", image.source)}`,
      thumbnail: `${config.API_YOUTUBE_THUMB.replace("{vidId}", image.source)}`,
      w: 320,
      h: 180,
      vId: image.source
    }));

    return (
      backdrops.length > 0 && (
        <div className="images">
          <div className="title">Trailers</div>

          <PhotoSwipeGallery
            items={backdrops}
            options={{}}
            thumbnailContent={this.getThumbnailContent}
            gettingData={e => this.thumbClicked(e)}
          />
        </div>
      )
    );
  }
}

export default MovieTrailers;
