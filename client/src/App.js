import React, { Component, Fragment } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { loadUser, signInUser,signUpUser,logOutUser } from './actions/authActions'

import ProtectedRoute from './ProtectedRoute'
import Nav from './components/Nav'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import NoMatch from './pages/NoMatch'

class App extends Component {

  componentDidMount() {
    this.props.loadUser()
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Nav 
          isAuthenticated={this.props.isAuthenticated}
          logOutUser={this.props.logOutUser}
          />
          <Switch>
            <Route exact path="/" render={props => (
                <Home {...props} user={this.props.user} />
              )} 
            />
            <Route exact path="/signin" render={props => (
                <SignIn 
                  {...props} 
                  isAuthenticated={this.props.isAuthenticated}
                  signInUser={this.props.signInUser} 
                  errorStatus={this.props.errorStatus}
                  errorMessage={this.props.errorMessage}
                />
              )}
            />
            <Route exact path="/signup" render={props => (
                <SignUp {...props} 
                  isAuthenticated={this.props.isAuthenticated}
                  signUpUser={this.props.signUpUser}
                  errorStatus={this.props.errorStatus}
                  errorMessage={this.props.errorMessage}
                />
              )}
            />
            <ProtectedRoute exact path="/dashboard" render={props => (
                <Dashboard 
                  {...props} 
                  isAuthenticated={this.props.isAuthenticated}
                  user={this.props.user}
                  token={this.props.token}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token,
    errorStatus: state.error.status,
    errorMessage: state.error.msg
  }
}

const mapActionsToProps = {
  loadUser,
  signInUser,
  signUpUser,
  logOutUser
}

export default connect(mapStateToProps, mapActionsToProps)(App)