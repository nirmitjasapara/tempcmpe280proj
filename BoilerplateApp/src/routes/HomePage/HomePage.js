import React, { Component } from 'react'
import StockList from '../../components/StockList/StockList'
import './HomePage.css'

export default class HomePage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  componentDidMount() {
    this.context.clearError();
    ApiService.getFollowings()
        .catch(this.context.setError)
        .then(this.context.setFollowings)
        .then(this.populateCompanyList)
  }

  populateCompanyList = companies => {
    Promise.all(companies.map (c => {
        return ApiService.getCompanyData(c.symbol)
            .then(this.context.addCompany)
            .catch(this.context.setError)
    }));
  }

  handleAddSuccess = symbol => {
    ApiService.getCompanyData(symbol)
          .then(this.context.addCompany)
          .catch(this.context.setError)
    const { history } = this.props
    history.push('/home')
  }


  render() {
    return (
      <main>
        {/* <Graph
        /> */}
        <StockList
          onAddSuccess={this.handleAddSuccess}
        />
        {/* <NewsFeed
        /> */}
      </main>
    )
  }
}