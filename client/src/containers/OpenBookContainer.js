import { connect } from "react-redux";

import { loadAllBooks } from "../actions/booksActions";
import { withRouter } from "react-router";

import OpenBook from "../components/OpenBook";

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    loadAllBooks(dispatch);
  }
});

const mapStateToProps = (state, props) => ({
  ...props,
  booksCount: state.booksReducer.data.length
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OpenBook));
