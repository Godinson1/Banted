import React from "react";
import { Link } from "react-router-dom";
import "./auth.scss";

const Layout = ({ children, page }) => {
  return (
    <div>
      <div className="landing">
        <div className="first">
          <div className="slanted">
            <h1>Banted.</h1>
            <div className="base-desc">
              <p>
                Connect with other football lovers and experience banter like
                never before.
              </p>
            </div>
          </div>
          <div id="triangle-right"></div>
          <div id="triangle-rights"></div>
        </div>
        <div className="second">
          <div className="ring"></div>
          <div className="ring-two"></div>
          <div className="ring-three"></div>
          <div className="banter-auth-logo">B</div>
          <div>
            <h2 className="auth-desc">
              Join an amazing community of football lovers today and share
              banter.
            </h2>
          </div>
          <div className="authContainer">
            <h1>{page}</h1>
            <div className="form">
              {children}
              <div className="base-texts">
                {page === "Login" ? (
                  <div>
                    Don't have an account? <Link to="/register">Register</Link>
                  </div>
                ) : (
                  <div>
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
