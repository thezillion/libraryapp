import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import MainView from "./components/MainView";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <div className="container">
              <MainView />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
