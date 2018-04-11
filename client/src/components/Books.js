import React, { Component } from "react";
import BookCard from "./BookCard";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

class Books extends Component {
  constructor(props) {
    super(props);
    props.loadData();
    this.state = {
      showAddAuthorDialog: false,
      errVisible: "invisible",
      errText: "",
      formData: {
        bookName: "",
        bookAuthor: "1",
        bookDescription: ""
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
  addNewBook() {
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
        url: "http://localhost:4000/api/add-book",
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
              <h6 className="heading float-left">BOOKS</h6>
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
            {this.props.data.map((d, i) => (
              <BookCard book={d} showAuthor={true} key={i} />
            ))}
          </div>
          <div className="col-lg-3">
            <button
              className="btn btn-block btn-primary"
              onClick={this.toggle.bind(this)}
            >
              Add Book
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
                  <label htmlFor="bookName">Book Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bookName"
                    placeholder="Book Name"
                    value={this.state.formData.bookName}
                    onChange={this.handleChange.bind(this, "bookName")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="authorAge">Author</label>
                  <select
                    className="form-control"
                    name="bookAuthor"
                    onChange={this.handleChange.bind(this, "bookAuthor")}
                  >
                    {this.props.authors.map((author, i) => (
                      <option value={author.id} key={i}>{author.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="bookDescription">Book Description</label>
                  <textarea
                    className="form-control"
                    name="bookDescription"
                    value={this.state.formData.bookDescription}
                    onChange={this.handleChange.bind(this, "bookDescription")}
                  />
                  <span class="text-muted">Maximum characters: 300</span>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addNewBook.bind(this)}>
                Save Book
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle.bind(this)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Books;
