import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem, 
  NavLink
} from 'reactstrap'

export default class Navigation extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div>
        <Navbar expand="sm" className="navbar-dark bg-primary mb-5">
          <Container>
            <Link to="/" className="navbar-brand">stocker</Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/" className="nav-link">
                  Home
                  </Link>        
                </NavItem>
                {this.props.isAuthenticated ? 
                  <Fragment>
                    <NavItem>
                      <Link to="/dashboard" className="nav-link">
                      Dashboard
                      </Link>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        className="nav-link" 
                        style={{cursor: 'pointer'}} 
                        onClick={() => this.props.logOutUser()}
                      >
                      Log Out
                      </NavLink>
                    </NavItem>
                  </Fragment> :
                  <Fragment>
                        <NavItem>
                      <Link to="/signin" className="nav-link">
                        Sign In
                      </Link>   
                    </NavItem>
                    <NavItem>
                      <Link to="/signup" className="nav-link">
                        Sign Up
                      </Link>   
                    </NavItem>
                  </Fragment>
                }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
