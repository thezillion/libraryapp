import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a href="/" className="navbar-brand">
            Library App
          </a>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href={`/books`} className="nav-link">
                  Books
                </a>
              </li>
              <li className="nav-item">
                <a href={`/authors`} className="nav-link">
                  Authors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
