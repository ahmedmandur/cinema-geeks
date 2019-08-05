import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 12
      }}
    >
      Cinema Geeks Library, Powered by&nbsp;
      <a
        href="https://www.themoviedb.org"
        target="blank"
        style={{ color: '#FFF' }}
      >
        TMDB
      </a>
    </footer>
  );
};

export default Footer;
