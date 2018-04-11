import { connect } from "react-redux";

import { loadAllBooks } from "../actions/booksActions";
import { loadAllAuthors } from "../actions/authorsActions";
import { withRouter } from "react-router";

import Books from "../components/Books";

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    loadAllBooks(dispatch);
    loadAllAuthors(dispatch);
  }
});

const mapStateToProps = state => ({
  data: state.booksReducer.data,
  authors: state.authorsReducer.data
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Books));
