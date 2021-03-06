import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import io from 'socket.io-client'
import './style.css'

import StockRow from '../StockRow'
import SearchForm from '../SearchForm'

export default class Watchlist extends Component {
	
	constructor(props) {
    super(props)
    
    this.state = {
			loading: true,
			childrenLoaded: 0,
			tickers: [],
			socket: io.connect('/', {
				query: { token: this.props.token },
				secure: true
			})
		}
		this.addLoadedChild = this.addLoadedChild.bind(this)
		this.addStock = this.addStock.bind(this)
		this.removeStock = this.removeStock.bind(this)
	}

	componentDidMount() {
		this.state.socket.on('watchlist', data => {
			if (!data.watchlist.length) {
				this.setState({ loading: false })
			}
			this.setState({ tickers: data.watchlist })
		})
	}

	componentWillUnmount() {
		this.state.socket.disconnect()
	}

	addLoadedChild() {
		this.setState({ childrenLoaded: this.state.childrenLoaded + 1 })
		if (this.state.childrenLoaded === this.state.tickers.length) {
			this.setState({ loading: false })
		}
	}

	addStock(watchlist) {
		this.state.socket.disconnect()
		this.setState(state => {
			return {
				loading: true,
				childrenLoaded: 0,
				tickers: [],
				socket: state.socket.connect('//localhost:8080', {
					query: { token: this.props.token },
					secure: true
				})
			}
		})
	}

	removeStock(watchlist) {
		this.setState({ tickers: watchlist })
	}
	
  render() {
    return (
      <Container>
				<SearchForm addStock={this.addStock} token={this.props.token} />
				<div 
				className={this.state.loading ? 'lds-ripple mx-auto' : 'd-none'}><div></div><div></div>
				</div>

				<p 
				className={this.state.loading ? 'd-none' : this.state.tickers.length ? 'd-none' : '' }>
				You're not watching any stocks
				</p>
				
				<Table bordered 
					className={this.state.loading ? 'd-none' : this.state.tickers.length ? '' : 'd-none' }
				>
					<thead>
						<tr>
							<th>Ticker</th>
							<th>Company</th>
							<th>Price</th>
							<th>Change</th>
							<th>Change Percent</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.tickers.map(ticker => {
							return (
								<StockRow 
								key={ticker}
								token={this.props.token}
								socket={this.state.socket}
								ticker={ticker}
								removeStock={this.removeStock}
								addLoadedChild={this.addLoadedChild}
								/>
							)
						})}
					</tbody>
				</Table>
      </Container>
    )
  }
}
