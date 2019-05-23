import React, { Component } from 'react'
import { Jumbotron, Container } from 'reactstrap'

class Home extends Component {

    render() {
        return (
            <Jumbotron>
                <Container className="text-center">
                <h1 className="display-3">Welcome</h1>
                <p className="lead">This is the home page.</p>
                </Container>
            </Jumbotron>
        )
    }

}
  
export default Home
  