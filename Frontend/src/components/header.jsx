import React from "react";
import { Link } from "react-router-dom";
import './header.css'; // Assuming you create a CSS file for styling

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <div className="button-group">
                  <Link
                    to="/login"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
