import React, { Component } from 'react'
import { Button } from 'reactstrap'
import axios from 'axios'

export default class StockRow extends Component {
	
	constructor(props) {
    super(props)
    
    this.state = {
			price: '-',
			change: '-',
			changePercent: '-'
		}

		this.removeRow = this.removeRow.bind(this)
	}

	componentDidMount() {
		let loaded = false
		this.props.socket.on(`${this.props.ticker}-data`, data => {
			this.setState({
				company: data.company,
				price: data.price,
				change: data.change,
				changePercent: data.changePercent
			})
			if (loaded === false) {
				loaded = true
				this.props.addLoadedChild()
			}
		})
	}

	async removeRow() {

		this.props.socket.emit(`remove-${this.props.ticker}`)
		
		const config = {
			method: 'get',
			url: `/dashboard/remove/${this.props.ticker}`,
			headers: {
					authorization: this.props.token
			}
		}
		const res = await axios({ ...config })
		
		this.props.removeStock(res.data.watchlist)
	}

  render() {
    return (
      <tr>
				<th scope="row">{this.props.ticker}</th>
				<td>{this.state.company}</td>
				<td>{this.state.price}</td>
				<td>{this.state.change}</td>
				<td>{this.state.changePercent}</td>
				<td><Button color='primary' onClick={this.removeRow}>{'X'}</Button></td>
			</tr>
    )
  }
}