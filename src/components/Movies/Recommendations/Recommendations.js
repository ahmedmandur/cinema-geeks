import React, { useEffect, useState } from "react";
import { fetchRecommendations, fetchGenres } from "../../../services/api";

import MovieItem from "../MovieItem/MovieItem";
function Recommendations(props) {
  const [isFetched, setIsFetched] = useState(false);
  const [genres, setGenres] = useState({});
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    setIsFetched(false);
    fetchGenres().then(res => setGenres(res.data));

    fetchRecommendations(props.movId).then(res => {
      setRecommendations(res.data.results);
      setIsFetched(true);
    });
  }, [props.movId]);

  if (!isFetched)
    return (
      <div className="recommendations">
        <div className="movie-recommendations">
          <div className="title">Recommendations</div>
          <div className="loading-box" />
        </div>
      </div>
    );
  return (
    <div className="recommendations">
      {recommendations && recommendations.length > 0 && (
        <div className="movie-recommendations">
          <div className="title">Recommendations</div>
          <div className="movies">
            <div className="movies-inner">
              {recommendations &&
                recommendations.map(movie => (
                  <MovieItem key={movie.id} movie={movie} genres={genres} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
