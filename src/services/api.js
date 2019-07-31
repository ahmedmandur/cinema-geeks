import axios from "axios";
import { config } from "../configs/tmdbConfig";

export const fetchMoviesListHome = (type, page) => {
  var apiLink = "";

  switch (type) {
    case "top_rated":
      apiLink = config.API_TOP_RATED;
      break;
    case "popular":
      apiLink = config.API_POPULAR;
      break;
    default:
      apiLink = config.API_UPCOMING;
      break;
  }

  return axios(`${apiLink}&page=${page}`);
};

export const fetchMoviesListSearch = (query, page) => {
  return axios(`${config.API_SEARCH}&query=${query}&page=${page}`);
};

export const fetchGenres = () => {
  return axios.get(`${config.API_GENRES}`);
};

export const fetchMovie = movId => {
  return axios.get(config.API_MOVIE_DETAILS.replace("{movie_id}", movId));
};
