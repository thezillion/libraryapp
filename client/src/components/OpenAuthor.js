import React, { Component } from "react";
import author_icon from "../images/author_icon.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import BookCard from "./BookCard";

class OpenAuthor extends Component {
  constructor(props) {
    super(props);
    if (this.props.authorsCount == 0) this.props.loadData();
    this.state = {
      author: {}
    };
    const authorId = props.match.params.authorId;
    props.loadData();
    axios({
      url: "http://localhost:4000/graphql",
      method: "post",
      data: {
        query: `{authors(id:${authorId}) {id, name, age, gender, description, books {id, name, description}}}`
      }
    })
      .then(res => {
        if (res.data.data.authors)
          this.setState({ author: res.data.data.authors[0] });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    if (!this.state.author.id)
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
                  <Link to="/authors">Authors</Link> / Details
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
                      <img src={author_icon} alt="author icon" />
                    </div>
                    <div className="col-lg-11">
                      <h6 className="card-title">{this.state.author.name}</h6>
                      <span className="card-subtitle mb-2 text-muted">
                        Age {this.state.author.age} / {this.state.author.gender}
                      </span>
                      <p className="card-text">
                        {this.state.author.description}
                      </p>
                      <div>
                        <h6 className="heading float-left">BOOKS</h6>
                        <h6 className="heading float-right">
                          {this.state.author.books.length} books
                        </h6>
                        <div style={{ clear: "both" }} />
                      </div>
                      <div className="books-list">
                        {this.state.author.books.map((d, i) => (
                          <BookCard book={d} key={i} showAuthor={false} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <NextPrevAuthorBtn {...this.props} />
            </div>
          </div>
        </div>
      );
  }
}

class NextPrevAuthorBtn extends Component {
  render() {
    if (this.props.authorsCount === 0) return <p className="text-muted">Loading...</p>;
    else {
      const authorId = this.props.match.params.authorId || 5;
      var prevAuthorId = parseInt(authorId, 10)-1;
      var nextAuthorId = parseInt(authorId, 10)+1;
      prevAuthorId = prevAuthorId<1?this.props.authorsCount:prevAuthorId;
      nextAuthorId = nextAuthorId>this.props.authorsCount?1:nextAuthorId;
      return (
        <div className="row">
          <div className="col-lg-6">
            <a
              href={`/authors/${prevAuthorId}`}
              className="btn btn-pager btn-block"
            >
              &laquo;
            </a>
          </div>
          <div className="col-lg-6">
            <a
              href={`/authors/${nextAuthorId}`}
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

export default OpenAuthor;
