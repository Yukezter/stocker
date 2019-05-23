import React, { Component } from 'react'
import Select, { createFilter } from 'react-select'
import axios from 'axios'

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
    console.log(`Option selected:`, selectedOption)
  }

  render() {
    const { selectedOption } = this.state

    return (
      <Select
        filterOption={createFilter({ ignoreAccents: false })}
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
      />
    )
  }
}