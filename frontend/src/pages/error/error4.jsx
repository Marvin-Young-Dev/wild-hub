import React from 'react';
import './error.css';

function Error4() {
  return (
    <div className="error-page">
      <video autoPlay muted loop className="background-video">
        <source src={require('../../assets/backgrounds/error4.mp4')} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className="content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          You’ve strayed from the path of balance.<br />
          Even Shen’s ultimate can’t teleport you to this page.<br />
          Return to base and try again.
        </p>
      </div>
    </div>
  );
}

export default Error4;
