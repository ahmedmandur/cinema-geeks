export const config = {
  API_IMAGE: {
    small: "https://image.tmdb.org/t/p/w185/",
    medium: "https://image.tmdb.org/t/p/w300/",
    large: "https://image.tmdb.org/t/p/w500/",
    original: "https://image.tmdb.org/t/p/original/"
  },
  API_POPULAR: `https://api.themoviedb.org/3/movie/popular?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`,
  API_UPCOMING: `https://api.themoviedb.org/3/movie/upcoming?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`,
  API_TOP_RATED: `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`,
  API_SEARCH: `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`,
  API_GENRES: `https://api.themoviedb.org/3/genre/movie/list?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`,
  API_MOVIE_DETAILS: `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`,
  API_MOVIE_DETAILS_CREDITS: `https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`,

  API_MOVIE_DETAILS_RECOMMENDATIONS: `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`
};
