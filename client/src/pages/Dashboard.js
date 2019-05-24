import React, { Component } from 'react'
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'

import Watchlist from '../components/Watchlist'

export default class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{cursor: 'pointer'}}
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1') }}
            >
              Watchlist
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{cursor: 'pointer'}}
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2') }}
            >
              Search
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="mt-4">
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Watchlist token={this.props.token} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    )
  }
}
