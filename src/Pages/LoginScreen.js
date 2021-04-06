import React, { useState, useEffect } from "react";
import Particles from "react-particles-js";
import { Link } from "react-router-dom";
import "./styles/landing/landing.scss";
import Footer from "../Components/Footer";

const LoginScreen = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  }, [errorMessage]);

  return (
    <div>
      <div className="overlay-container">
        <div className="landing-container">
          <div className="particles">
            <Particles className="particles" />
          </div>

          <div className="after">
            <div className="flex">
              <div className="one">
                <div>
                  <h1 className="large-text">Banted.</h1>
                </div>
                <div>
                  <p className="medium-text">
                    Connect with other football lovers and experience banter
                    like never before.
                  </p>
                </div>
                <div className="flex-landing">
                  <div>
                    <Link id="link" to="/register">
                      <button className="button-landing">Get Started</button>
                    </Link>
                  </div>
                  <div>
                    <Link id="link" to="/login">
                      <button className="button-landing">Login</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="spacer"></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginScreen;
