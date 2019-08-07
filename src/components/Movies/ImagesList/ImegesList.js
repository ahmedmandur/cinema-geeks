import React, { Component } from "react";
import { fetchImages } from "../../../services/api";
import { PhotoSwipeGallery } from "react-photoswipe";
import "react-photoswipe/lib/photoswipe.css";

import { config } from "../../../configs/tmdbConfig";

class ImagesList extends Component {
  state = {
    isFetched: false,
    images: null
  };

  componentDidMount() {
    this.LoadMovieImages(this.props.movId);
  }

  LoadMovieImages(movieId) {
    fetchImages(movieId).then(res => {
      this.setState({ images: res.data, isFetched: true });
    });
  }

  imageLoaded = e => {
    e.target.classList.add("img-loaded");
  };

  getThumbnailContent = item => {
    return (
      <img
        src={item.thumbnail}
        onLoad={this.imageLoaded}
        alt={this.props.title}
      />
    );
  };

  render() {
    if (!this.state.isFetched)
      return (
        <div className="movies-list-container">
          <div className="loading-box" />
        </div>
      );

    let backdrops = this.state.images.backdrops.map(image => ({
      src: `${config.API_IMAGE.original}/${image.file_path}`,
      thumbnail: `${config.API_IMAGE.small}/${image.file_path}`,
      w: image.width,
      h: image.height
    }));

    return (
      backdrops.length > 0 && (
        <div className="images">
          <div className="title">Images</div>
          <PhotoSwipeGallery
            items={backdrops}
            options={{}}
            thumbnailContent={this.getThumbnailContent}
          />
        </div>
      )
    );
  }
}

export default ImagesList;
