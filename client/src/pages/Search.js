import React, { Component } from 'react'
import { Jumbotron, Container } from 'reactstrap'

import SearchInput from '../components/SearchForm'

export default class Search extends Component {

    render() {
        return (
            <Jumbotron className="bg-transparent">
                <Container className="text-center">
                <h1 className="display-3">Search</h1>
                <SearchInput />
                </Container>
            </Jumbotron>
        )
    }

}
