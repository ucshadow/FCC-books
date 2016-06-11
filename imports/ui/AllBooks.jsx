import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import { BookData } from '../api/bookData'
import BookInfo from '../ui/BookInfo.jsx'


class AllBooks extends Component {

  constructor(props) {
    super(props);

    this.allUsers = this.allUsers.bind(this);
  }

  allUsers() {
    return this.props.bookData.map((o) => {
      return <SingleUser key={Math.random()} d={o} />
    })
  }

  render() {
    return (
      <div>
        {this.allUsers()}
      </div>
    )
  }
}


class SingleUser extends Component {

  constructor() {
    super();

    this.parseBooks = this.parseBooks.bind(this);
  }

  parseBooks() {
    return this.props.d.books.map((b) => {
      return <BookInfo key={Math.random()} d={b} user={this.props.d.user} />
    })
  }

  render() {
    return (
      <div>
        {this.parseBooks()}
      </div>
    )
  }
}


AllBooks.propTypes = {
  bookData: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('bookData');
  return {
    bookData: BookData.find({}).fetch()
  };
}, AllBooks);