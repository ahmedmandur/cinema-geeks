import React from "react";
import history from "../../../history";
import { Link } from "react-router-dom";

class TopNavbar extends React.Component {
  state = {
    searchText: ""
  };

  handleKeydown = event => {
    if (this.state.searchText.length === 0) {
      history.push("/");
    }

    if (event.key === "Enter" && this.state.searchText.length > 0) {
      this.props.searchChanged(this.state.searchText);
    }
  };

  handleSearchButtonClick = () => {
    if (this.state.searchText.length === 0) {
      history.push("/");
    }

    if (this.state.searchText.length > 0) {
      this.props.searchChanged(this.state.searchText);
    }
  };

  handleChangeEvent = event => {
    this.setState({ searchText: event.target.value });

    if (event.target.value.length === 0) {
      history.push("/");
    }
  };

  handleLogoClick = () => {
    this.setState({ searchText: "" });
  };

  render() {
    return (
      <header>
        <div className="container">
          <div className="content">
            <Link to={`/`} className="logo" onClick={this.handleLogoClick}>
              <span>Cinema Geeks</span>
            </Link>
            <div className="header-search-field">
              <input
                type="text"
                placeholder={"Enter search term..."}
                onChange={this.handleChangeEvent}
                value={this.state.searchText}
                onKeyDown={this.handleKeydown}
              />
              <button
                className="search-btn"
                onClick={this.handleSearchButtonClick}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default TopNavbar;
