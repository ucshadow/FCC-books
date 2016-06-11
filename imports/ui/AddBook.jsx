import React, { Component, PropTypes } from 'react'
import SearchResult from '../ui/SearchResult.jsx'

export default class AddBook extends Component {

  constructor() {
    super();
    this.state = {results: []};

    this.searchBook = this.searchBook.bind(this);
    this.changeState = this.changeState.bind(this);
    this.mapResults = this.mapResults.bind(this);
  }

  changeState(resultsArray) {
    return this.setState({results: resultsArray})
  }

  mapResults() {
    return this.state.results.map((i) => {
      return <SearchResult key={i.id} d={i} />
    })
  }

  searchBook() {
    let stateFunction = this.changeState;
    let url = "https://www.googleapis.com/books/v1/volumes?q=" + $("#searchBook").val();
    console.log(url);
    $.getJSON(url, function(res) {
      console.log(res);
      return stateFunction(res.items)
    });
  }

  render() {
    return (
      <div>
        <input type="text" id="searchBook" />
        <button onClick={this.searchBook} > Search </button>
        <div className="search-for-book">
          {this.state.results.length === 0 ? "Search for a book to add. If there are more results" +
          ", pick the one that you want" : "click on the book you want to add to your collection"}
        </div>
        <div className="alerts" id="alerts"> &nbsp; </div>
        <div className="search-result-container">
          {this.mapResults()}
        </div>
      </div>
    )
  }

}