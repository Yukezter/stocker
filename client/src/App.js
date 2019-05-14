import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Jumbotron />
        <Container>
          <h1>Yoo</h1>
        </Container>
      </div>
    )
  }
}

export default App
