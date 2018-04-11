import { connect } from "react-redux";

import { loadAllAuthors } from "../actions/authorsActions";
import { withRouter } from "react-router";

import OpenAuthor from "../components/OpenAuthor";

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    loadAllAuthors(dispatch);
  }
});

const mapStateToProps = (state, props) => ({
  ...props,
  authorsCount: state.authorsReducer.data.length
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OpenAuthor));
