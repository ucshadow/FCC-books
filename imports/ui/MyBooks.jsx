import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';

import { BookData } from '../api/bookData'
import AddBook from '../ui/AddBook.jsx'
import SingleBook from '../ui/SingleBook.jsx'

class MyBooks extends Component {

  constructor(props) {
    super(props);

    this.dBooks = this.dBooks.bind(this);
    this.displayAllMyBooks = this.displayAllMyBooks.bind(this);
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

  render() {
    return (
      <div>
        {this.displayAllMyBooks()}
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