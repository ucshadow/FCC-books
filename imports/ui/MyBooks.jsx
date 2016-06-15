import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';

import { BookData } from '../api/bookData'
import AddBook from '../ui/AddBook.jsx'
import SingleBook from '../ui/SingleBook.jsx'
import TradeOffers from '../ui/TradeOffers.jsx'

class MyBooks extends Component {

  constructor(props) {
    super(props);

    this.dBooks = this.dBooks.bind(this);
    this.displayAllMyBooks = this.displayAllMyBooks.bind(this);
    this.tradeRequests = this.tradeRequests.bind(this);
    this.tradeOffers = this.tradeOffers.bind(this);
  }

  dBooks() {
    console.log(this.props.bookData);
  }

  displayAllMyBooks() {
    return this.props.bookData.map((book) => {
      if(book.user === Meteor.user().username) {
        return <SingleBook key={Math.random()} d={book.books} />
      }
    })
  }

  tradeRequests() {
    return this.props.bookData.map((user_) => {
      if(user_.user === Meteor.user().username) {
        return <button key={Math.random()} className="my-trade-requests"> Trade requests: {user_.trades.requests.length} </button>
      }
    })
  }

  tradeOffers() {
    return this.props.bookData.map((user_) => {
      if(user_.user === Meteor.user().username) {
        return <TradeOffers key={Math.random()} d={user_.trades.offers} />
      }
    })
  }

  render() {
    return (
      <div>
        {this.tradeRequests()}
        {this.tradeOffers()}
        {this.displayAllMyBooks()}
        <button onClick={this.dBooks}> INFO </button>
      </div>
    )
  }
}


MyBooks.propTypes = {
  bookData: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('bookData');
  return {
    bookData: BookData.find({}).fetch()
  };
}, MyBooks);