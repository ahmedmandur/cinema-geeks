import React from 'react';
import { Link } from 'react-router-dom';
const NoItemsFound = () => {
  return (
    <div style={{ textAlign: 'center', color: '#FFF', height: '80vh' }}>
      No result Found, back to&nbsp;
      <Link to="/" className="not-found-home">
        Home
      </Link>
    </div>
  );
};

export default NoItemsFound;
