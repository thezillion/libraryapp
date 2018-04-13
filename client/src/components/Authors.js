import React, { Component } from "react";
import author_icon from "../images/author_icon.svg";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

class Authors extends Component {
  constructor(props) {
    super(props);
    props.loadData();
    this.state = {
      showAddAuthorDialog: false,
      errVisible: "invisible",
      errText: "",
      formData: {
        authorName: "",
        authorAge: "",
        authorGender: "Male",
        authorAbout: ""
      }
    };
  }
  toggle() {
    this.setState({
      showAddAuthorDialog: !this.state.showAddAuthorDialog
    });
  }
  handleChange(k, e) {
    var x = { ...this.state.formData };
    x[k] = e.target.value;
    this.setState({ formData: x });
  }
  callError(text) {
    this.setState({ errVisible: "", errText: text });
  }
  removeError() {
    this.setState({ errVisible: "invisible", errText: "" });
  }
  addNewAuthor() {
    const x = Object.keys(this.state.formData);
    var flag = 0;
    x.forEach((f, i) => {
      if (this.state.formData[f] === "") {
        flag = 1;
        return false;
      }
    });
    if (flag === 1) {
      this.callError("Please fill in all values");
    } else {
      this.removeError();
      axios({
        method: "post",
        url: "http://localhost:4000/api/add-author",
        data: this.state.formData
      })
        .then(res => {
          this.props.loadData();
          this.toggle();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    return (
      <div>
        <div>
          <div className="row">
            <div className="col-lg-9">
              <h6 className="heading float-left">AUTHORS</h6>
              <h6 className="heading float-right">
                {this.props.data.length} books
              </h6>
              <div style={{ clear: "both" }} />
            </div>
            <div className="col-lg-3" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            {this.props.data.map((d, i) => <AuthorCard author={d} key={i} />)}
          </div>
          <div className="col-lg-3">
            <button
              className="btn btn-block btn-primary"
              onClick={this.toggle.bind(this)}
            >
              Add Author
            </button>
          </div>
        </div>
        <div className="static-modal">
          <Modal
            isOpen={this.state.showAddAuthorDialog}
            toggle={this.toggle.bind(this)}
          >
            <ModalHeader toggle={this.toggle.bind(this)}>
              Add Author
            </ModalHeader>
            <ModalBody>
              <div className={`err ${this.state.errVisible}`}>
                {this.state.errText}
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="authorName">Author Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="authorName"
                    placeholder="Author Name"
                    value={this.state.formData.authorName}
                    onChange={this.handleChange.bind(this, "authorName")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="authorAge">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="authorAge"
                    placeholder="Age"
                    value={this.state.formData.authorAge}
                    onChange={this.handleChange.bind(this, "authorAge")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="authorGender">Gender</label>
                  <select
                    className="form-control"
                    name="authorGender"
                    onChange={this.handleChange.bind(this, "authorGender")}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="authorAbout">About Author</label>
                  <textarea
                    className="form-control"
                    name="authorAbout"
                    value={this.state.formData.authorAbout}
                    onChange={this.handleChange.bind(this, "authorAbout")}
                  />
                </div>
                <span class="text-muted">Maximum characters: 300</span>
              </form>
            </ModalBody>
            <ModalFooter>
              <div className="row" style={{ width: "100%", margin: 0 }}>
                <div className="col-lg-6">
                  <Button
                    color="secondary"
                    block={true}
                    onClick={this.toggle.bind(this)}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="col-lg-6">
                  <Button
                    color="primary"
                    block={true}
                    onClick={this.addNewAuthor.bind(this)}
                  >
                    Save Author
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

class AuthorCard extends Component {
  render() {
    const b = this.props.author;
    return (
      <Link to={`/authors/${b.id}`} className="dormant-link">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-1">
                <img src={author_icon} alt="author icon" />
              </div>
              <div className="col-lg-11">
                <h6 className="card-title">{b.name}</h6>
                <span className="card-subtitle mb-2 text-muted">
                  Age {b.age} / {b.gender}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Authors;
