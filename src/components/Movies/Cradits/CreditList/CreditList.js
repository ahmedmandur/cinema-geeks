import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CreditItem from "../CreditItem/CreditItem";

import { fetchCredit } from "../../../../services/api";
class CreditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: props.match.params.cast !== undefined ? true : false,
      isFetched: false,
      credits: null
    };
  }

  componentDidMount() {
    const { movId } = this.props;
    this.setState({ isFetched: false });
    this.LoadMovieCredits(movId);

    this.setState({ isFetched: true });
  }

  LoadMovieCredits(movId) {
    fetchCredit(movId).then(res => {
      this.setState({ credits: res.data.cast });
    });
  }

  showAll = () => {
    this.setState({
      showAll: !this.state.showAll
    });

    if (this.state.showAll) {
      this.props.history.push(`/movie/${this.props.movId}`);
    } else {
      this.props.history.push(`/movie/${this.props.movId}/cast`);
    }
  };

  render() {
    let creditsArray = this.state.credits;
    if (!this.state.showAll) {
      if (creditsArray != null) {
        creditsArray = this.state.credits.slice(0, 6);
      }
    }

    if (!this.state.isFetched)
      return (
        <div className="credits">
          <div className="loading-box" />
        </div>
      );

    return (
      <div className="credits">
        <div className="credits-title">
          Top Billed Cast
          {this.state.credits !== null && this.state.credits.length > 6 && (
            <span
              className={this.state.showAll ? "active" : ""}
              onClick={this.showAll}>
              Show all
            </span>
          )}
        </div>
        <div className="credits-inline">
          {this.state.credits !== null &&
            creditsArray.map(credit => (
              <CreditItem key={credit.cast_id} credit={credit} />
            ))}
        </div>
      </div>
    );
  }
}

export default withRouter(CreditList);
