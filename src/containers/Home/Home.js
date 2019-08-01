import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { fetchMoviesListHome, fetchGenres } from "../../services/api";
import Spinner from "../../components/Ui/Spinner/Spinner";
import MoviesList from "../../components/Movies/MoviesList/MoviesList";
import MoviesFilter from "../../components/Ui/MoviesFilter/MoviesFilter";

const Home = () => {
  const [genrsList, setGenrsList] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [pageTitle, setPageTitle] = useState("Upcoming Movies");

  async function fetchData(page, slug) {
    setIsLoading(true);
    await fetchGenres().then(res => setGenrsList(res.data));

    switch (slug) {
      case "top_rated":
        setPageTitle("Top Rated");
        break;
      case "popular":
        setPageTitle("Popular Movies");
        break;
      default:
        setPageTitle("Upcoming Movies");
        break;
    }

    await fetchMoviesListHome(slug, page).then(res => {
      setResults(res.data.results);
      setTotalResults(res.data.total_results);
      setActivePage(page);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchData(1, "");
  }, []);

  const handleSelectedPageChanged = page => {
    fetchData(page, filter);
  };

  const handleFilterChanged = filter => {
    setFilter(filter);
    fetchData(1, filter);
  };
  return (
    <div className="movies">
      <Helmet>
        <title>{pageTitle} - Cinema Geeks</title>
      </Helmet>
      <MoviesFilter changeFilter={slug => handleFilterChanged(slug)} />

      {isLoading ? (
        <Spinner />
      ) : (
        <MoviesList
          movies={results}
          selectedPageChanged={ev => handleSelectedPageChanged(ev)}
          activePage={activePage}
          totalResults={totalResults}
          genres={genrsList}
        />
      )}
    </div>
  );
};

export default Home;
