import React, { Component } from "react";
import book_icon from "../images/book_icon.svg";
import { Link } from "react-router-dom";

class BookCard extends Component {
  render() {
    const b = this.props.book;
    return (
      <Link to={`/books/${b.id}`} className="dormant-link">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-1">
                <img src={book_icon} alt="book icon" />
              </div>
              <div className="col-lg-11">
                <h6 className="card-title">{b.name}</h6>
                {this.props.showAuthor ? (
                  <h6 className="card-subtitle mb-2 text-muted">
                    by {b.author.name}
                  </h6>
                ) : (
                  ``
                )}
                <p className="card-text">{b.description.substring(0, 93)}...</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default BookCard;
