    import React from 'react';
    import './error.css';

    function Error2() {
        return (
            <div className="error-page">
                <video autoPlay muted loop className="background-video">
                    <source src={require('../../assets/backgrounds/error2.mp4')} type="video/mp4" />
                    Dein Browser unterstützt kein HTML5-Video.
                </video>
                <div className="content">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>
                        Oops! This page disappeared like Teemo in a bush.<br />
                        Maybe you're on the wrong path?
                    </p>
                </div>
            </div>
        );
    }

    export default Error2;