import React from 'react';
import './error.css';

function Error1() {
  return (
    <div className="error-page">
      <video autoPlay muted loop className="background-video">
        <source src={require('../../assets/backgrounds/error1.mp4')} type="video/mp4" />
        Dein Browser unterstützt kein HTML5-Video.
      </video>
      <div className="content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Lost in space? <br />
          Looks like Nautilus hooked this page into the void. <br />
          Try orbiting back to safety!
        </p>
      </div>
    </div>
  );
}

export default Error1;