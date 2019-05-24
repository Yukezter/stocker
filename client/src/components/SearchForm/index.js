import React, { Component, Fragment } from 'react'
import Select, { createFilter } from 'react-select'
import { FixedSizeList as List } from 'react-window'
import axios from 'axios'

import { Button } from 'reactstrap'

const height = 35

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props
    const [value] = getValue()
    const initialOffset = options.indexOf(value) * height

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    )
  }
}

export default class SearchForm extends Component {

  state = {
    selectedOption: null,
    options: []
  }

  async componentDidMount() {
    const symbols = await axios.get('/stocks/symbols')
    console.log(symbols.data.tickers)
    this.setState({ options: symbols.data.tickers })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
  }

  handleSubmit = async () => {

    const config = {
			method: 'get',
			url: `/dashboard/add/${this.state.selectedOption.value}`,
			headers: {
					authorization: this.props.token
			}
    }
    
    const res = await axios({ ...config })

    this.props.addStock(res.data.watchlist)
  }

  render() {
    const { selectedOption } = this.state

    return (
      <Fragment>
        <Select
          filterOption={createFilter({ ignoreAccents: false })}
          components={{MenuList}}
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
        />
        <Button onClick={this.handleSubmit}>Add</Button>
      </Fragment>
    )
  }
}