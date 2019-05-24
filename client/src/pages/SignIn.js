import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Jumbotron, Container, Form, Button } from 'reactstrap'

import FormGroup from '../components/FormGroup'

class SignIn extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usernameOrEmail: '',
            password: ''
        }

        this.onInputChange = event => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }

        this.onFormSubmit = event => {
            event.preventDefault()

            const { usernameOrEmail, password } = this.state
            console.log(usernameOrEmail)
            console.log(password)

            this.props.signInUser(usernameOrEmail, password)
            this.setState({ usernameOrEmail: '', password: '' })
        }
    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <Jumbotron className="bg-transparent mx-auto" style={{width: '500px'}}>
                <Container className="text-center">
                    <h1 className="display-3">Sign In {this.props.user}</h1>
                    <p className="lead">This is the sign in page.</p>
                    <Form onSubmit={this.onFormSubmit}>
                        <p>{this.props.errorStatus && this.props.errorMessage}</p>
                        <FormGroup 
                            type='text'
                            placeholder='Username or email'
                            name='usernameOrEmail'
                            value={this.state.username}
                            onInputChange={this.onInputChange}
                        >Username or email</FormGroup>
                        <FormGroup 
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={this.state.password}
                            onInputChange={this.onInputChange}
                        >Password</FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Container>
            </Jumbotron>
        )
    }
}

export default SignIn