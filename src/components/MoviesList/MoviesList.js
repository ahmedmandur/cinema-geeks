import React from "react";
import Pagination from "react-js-pagination";
import MovieItem from "../../components/MovieItem/MovieItem";
function MoviesList(props) {
  const handlePageChange = pageNumber => {
    props.selectedPageChanged(pageNumber);
  };

  var movies = "";
  if (props.movies.length > 0) {
    movies = (
      <div className="movies-inner">
        {props.movies &&
          props.movies.map(movie => (
            <MovieItem key={movie.id} movie={movie} genres={props.genres} />
          ))}
        <div className="pagination-container">
          <Pagination
            activePage={props.activePage}
            itemsCountPerPage={20}
            totalItemsCount={props.totalResults}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            prevPageText={``}
            nextPageText={``}
            firstPageText={``}
            lastPageText={``}
          />
        </div>
      </div>
    );
  }

  return movies;
}

export default MoviesList;
