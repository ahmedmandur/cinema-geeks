import React from 'react';
import history from '../../history';
import MoviesList from '../../components/Movies/MoviesList/MoviesList';
import Helmet from 'react-helmet';
import Spinner from '../../components/Ui/Spinner/Spinner';
import { fetchMoviesListSearch, fetchGenres } from '../../services/api';
import NoItemsFound from '../../components/Movies/NoItemsFound/NoItemsFound';
class Search extends React.Component {
  state = {
    isLoading: true,
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
    this.setState({ isLoading: false });
  }

  fetchData = page => {
    fetchGenres().then(res => {
      this.setState({ genresList: res.data });
    });
    let queryValue = this.props.match.params.query;

    if (!queryValue) {
      queryValue = this.props.query;
    }

    fetchMoviesListSearch(queryValue, page).then(res => {
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
        ) : this.state.results.length > 0 ? (
          <MoviesList
            movies={this.state.results}
            selectedPageChanged={ev => this.handleSelectedPageChanged(ev)}
            activePage={this.state.activePage}
            totalResults={this.state.totalResults}
            genres={this.state.genresList}
          />
        ) : (
          <NoItemsFound />
        )}
      </div>
    );
  }
}

export default Search;
