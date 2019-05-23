import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Jumbotron, Container, Form, Button } from 'reactstrap'

import FormGroup from '../components/FormGroup'

class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: ''
        }

        this.onInputChange = event => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }

        this.onFormSubmit = event => {
            event.preventDefault()

            const { username, email, password } = this.state
            console.log(username)
            console.log(email)
            console.log(password)

            this.props.signUpUser(username, email, password)
            this.setState({ username: '', email: '',  password: '' })
        }
    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <Jumbotron>
                <Container className="text-center">
                    <h1 className="display-3">Sign Up{this.props.user}</h1>
                    <p className="lead">This is the sign up page.</p>
                    <Form onSubmit={this.onFormSubmit}>
                        <p>{this.props.errorStatus && this.props.errorMessage}</p>
                        <FormGroup 
                            type='text'
                            placeholder='Username'
                            name='username'
                            value={this.state.username}
                            onInputChange={this.onInputChange}
                        >Username</FormGroup>
                        <FormGroup 
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={this.state.email}
                            onInputChange={this.onInputChange}
                        >Email</FormGroup>
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

export default SignUp