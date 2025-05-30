import React from 'react';
import './error.css';

function Error3() {
  return (
    <div className="error-page">
      <video autoPlay muted loop className="background-video">
        <source src="/assets/backgrounds/error3.mp4" type="video/mp4" />  
        Dein Browser unterstützt kein HTML5-Video.
      </video>
      <div className="content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page missed...<br />
          But don’t worry, Yasuo says it was the wind’s fault.
        </p>
      </div>
    </div>
  );
}

export default Error3;
