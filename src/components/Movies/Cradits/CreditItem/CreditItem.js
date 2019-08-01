import React from "react";
import { Link } from "react-router-dom";
import { config } from "../../../../configs/tmdbConfig";

export default function CreditItem(props) {
  const imageLoaded = e => {
    e.target.classList.add("img-loaded");
  };

  const { credit } = props;

  return (
    <div className="credit-item">
      {/* <Link to={`/person/${credit.id}`} className="credit-img">
      
      </Link> */}

      <a className="credit-img">
        {credit.profile_path !== null && (
          <img
            src={`${config.API_IMAGE.small}/${credit.profile_path}`}
            onLoad={imageLoaded}
            alt={credit.name}
          />
        )}
      </a>
      <div className="credit-content">
        <div className="credit-name">{credit.name}</div>
        <div className="credit-character">{credit.character}</div>
      </div>
    </div>
  );
}
