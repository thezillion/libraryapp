import { connect } from "react-redux";

import { loadAllAuthors } from "../actions/authorsActions";
import { withRouter } from "react-router";

import Authors from "../components/Authors";

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    loadAllAuthors(dispatch);
  }
});

const mapStateToProps = state => ({
  data: state.authorsReducer.data
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authors));
