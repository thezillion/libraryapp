import React, { Component } from "react";
import book_icon from "../images/book_icon.svg";
import { Link } from "react-router-dom";
import axios from "axios";

class OpenBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
    const bookId = props.match.params.bookId;
    axios({
      url: "http://localhost:4000/graphql",
      method: "post",
      data: {
        query: `{books(id:${bookId}) {id, name, description, author {id, name}}}`
      }
    })
      .then(res => {
        if (res.data.data.books)
          this.setState({ book: res.data.data.books[0] });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    if (!this.state.book.id)
      return (
        <p>
          <br />
          <br />Loading...
        </p>
      );
    else
      return (
        <div>
          <div>
            <div className="row">
              <div className="col-lg-9">
                <h6 className="heading float-left">
                  <Link to="/books">Books</Link> / Details
                </h6>
                <div style={{ clear: "both" }} />
              </div>
              <div className="col-lg-3" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-1">
                      <img src={book_icon} alt="book icon" />
                    </div>
                    <div className="col-lg-11">
                      <h6 className="card-title">{this.state.book.name}</h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        by{" "}
                        <Link to={`/authors/${this.state.book.author.id}`}>
                          {this.state.book.author.name}
                        </Link>
                      </h6>
                      <p className="card-text">{this.state.book.description}</p>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum pretium dolor eget lorem interdum pharetra.
                        In dapibus dui eget nunc lacinia, et efficitur orci
                        aliquam. Curabitur ac arcu ut arcu aliquet fringilla id
                        in lectus. Morbi ac massa diam. Maecenas eget velit
                        dolor. Donec commodo lacus metus, et efficitur mauris
                        aliquam vitae. Praesent vulputate, nisl quis placerat
                        aliquet, urna justo accumsan tellus, sit amet varius
                        lacus orci sit amet augue. Vivamus at lorem sit amet
                        mauris vulputate condimentum ut a ipsum. Proin urna
                        lorem, blandit eget nulla sed, varius euismod nisl.
                      </p>
                      <p className="card-text">
                        Vivamus ut justo nunc. Phasellus rutrum turpis in nisl
                        suscipit, quis ultrices ante aliquam. Sed sed velit
                        quam. Proin eu lectus justo. In hac habitasse platea
                        dictumst. Mauris varius ante a aliquam rhoncus. Quisque
                        tincidunt nulla eu massa ornare dictum. Ut et imperdiet
                        leo. Suspendisse posuere diam interdum diam laoreet, in
                        congue quam consectetur. Vivamus eu nibh dapibus,
                        pulvinar neque vel, condimentum diam. Aliquam lobortis
                        turpis ac elementum porta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <NextPrevBookBtn {...this.props} />
            </div>
          </div>
        </div>
      );
  }
}

class NextPrevBookBtn extends Component {
  render() {
    if (this.props.BooksCount === 0) return <p className="text-muted">Loading...</p>;
    else {
      const BookId = this.props.match.params.bookId || 10;
      var prevBookId = parseInt(BookId, 10)-1;
      var nextBookId = parseInt(BookId, 10)+1;
      prevBookId = prevBookId<1?this.props.booksCount:prevBookId;
      nextBookId = nextBookId>this.props.booksCount?1:nextBookId;
      return (
        <div className="row">
          <div className="col-lg-6">
            <a
              href={`/books/${prevBookId}`}
              className="btn btn-pager btn-block"
            >
              &laquo;
            </a>
          </div>
          <div className="col-lg-6">
            <a
              href={`/books/${nextBookId}`}
              className="btn btn-pager btn-block"
            >
              &raquo;
            </a>
          </div>
        </div>
      );
    }
  }
}

export default OpenBook;
