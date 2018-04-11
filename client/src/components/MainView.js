import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BooksContainer from "../containers/BooksContainer";
import AuthorsContainer from "../containers/AuthorsContainer";
import OpenAuthorContainer from "../containers/OpenAuthorContainer";
import OpenBookContainer from "../containers/OpenBookContainer";

class MainView extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={`/`} component={BooksContainer} />
          <Route exact path={`/books`} component={BooksContainer} />
          <Route
            exact
            path="/books/:bookId"
            render={props => <OpenBookContainer {...props} />}
          />
          <Route exact path="/authors" component={AuthorsContainer} />
          <Route
            exact
            path="/authors/:authorId"
            render={props => <OpenAuthorContainer {...props} />}
          />
        </div>
      </Router>
    );
  }
}

export default MainView;
