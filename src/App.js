import React, { Suspense } from "react";
import TopNavbar from "./components/Ui/TopNavbar/TopNavbar";
import { Router, Switch, Route } from "react-router-dom";
import Spinner from "./components/Ui/Spinner/Spinner";
import "./assets/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import history from "./history";
import Search from "./containers/Search/Search";
class App extends React.Component {
  state = {
    query: ""
  };

  handleSearchChanged = searchValue => {
    if (searchValue.length > 0) {
      this.setState({ query: searchValue });
      history.push(`/search/${searchValue}/1`);
    } else {
      this.setState({ query: "" });
      history.push("/");
    }
  };

  render() {
    const HomeComponent = React.lazy(() => import("./containers/Home/Home"));
    const MovieComponent = React.lazy(() => import("./containers/Movie/Movie"));

    return (
      <Router history={history}>
        <div className="wrapper">
          <TopNavbar searchChanged={this.handleSearchChanged} />
          <div className="container">
            <Switch>
              <Suspense fallback={<Spinner />}>
                <Route path="/" exact component={HomeComponent} />
                <Route
                  path="/search/:query/:page?"
                  render={props => (
                    <Search {...props} query={this.state.query} />
                  )}
                />
                <Route
                  path="/movie/:movieId/:movieName?"
                  exact
                  component={MovieComponent}
                />
              </Suspense>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
