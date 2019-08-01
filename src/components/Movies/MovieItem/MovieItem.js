import React from "react";
import { Link } from "react-router-dom";
import { config } from "../../../configs/tmdbConfig";
import { urlSlug } from "../../../Utils/shared";
const MovieItem = props => {
  const { movie, genres } = props;

  const imageLoaded = e => {
    e.target.classList.add("img-loaded");
  };

  return (
    <div className="movie">
      <div
        className={`movie-rating ${movie.vote_average >= 7 &&
          "movie-rating-positive"}`}>
        {movie.vote_average}
      </div>
      <Link
        to={`/movie/${movie.id}/${urlSlug(movie.title)}`}
        className="movie-poster">
        {movie.poster_path && (
          <img
            alt={movie.title}
            src={`${config.API_IMAGE.small}/${movie.poster_path}`}
            onLoad={imageLoaded}
          />
        )}
      </Link>
      <Link
        to={`/movie/${movie.id}/${urlSlug(movie.title)}`}
        className="movie-title">
        {movie.title}
      </Link>
      <div className="movie-genres">
        <ul className="movie-genres">
          {movie.genre_ids.map((id, index) => {
            const item = genres.genres.filter(genre => genre.id === id);
            if (item.length) {
              return (
                <li key={id}>
                  {item.shift().name}
                  {index + 1 !== movie.genre_ids.length && ", "}{" "}
                </li>
              );
            } else {
              return "";
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default MovieItem;
