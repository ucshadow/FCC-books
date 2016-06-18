import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';

import { BookData } from '../api/bookData'
import AddBook from '../ui/AddBook.jsx'
import SingleBook from '../ui/SingleBook.jsx'
import TradeOffers from '../ui/TradeOffers.jsx'
import TradeRequests from '../ui/TradeRequests.jsx'

class MyBooks extends Component {

  constructor(props) {
    super(props);

    this.displayAllMyBooks = this.displayAllMyBooks.bind(this);
    this.tradeRequests = this.tradeRequests.bind(this);
    this.tradeOffers = this.tradeOffers.bind(this);
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
        return <TradeRequests key={Math.random()} d={user_.trades.requests} />
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
    if(this.props.user) {
      return (
        <div>
          <div className="trade-buttons">
            {this.tradeRequests()}
            {this.tradeOffers()}
          </div>
          {this.displayAllMyBooks()}
        </div>
      )
    } else {
      return (
        <div className="user-info">
          Please Log In to access your books!
        </div>
      )
    }
  }
}


MyBooks.propTypes = {
  bookData: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('bookData');
  return {
    bookData: BookData.find({}).fetch(),
    user: Meteor.user()
  };
}, MyBooks);