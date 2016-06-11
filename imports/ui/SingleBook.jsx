import React, { Component, PropTypes } from 'react'


export default class SingleBook extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.d);
    this.bookInfo = this.bookInfo.bind(this);
  }

  bookInfo() {
    return this.props.d.map((singleBook) => {
      return <ParseBook key={singleBook.industryIdentifiers[1].identifier} d={singleBook} />
    })
  }

  render() {
    return (
      <div className="all-my-books">
        {this.bookInfo()}
      </div>
    )
  }
}


class ParseBook extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="single-book">
        <div className="book-title">
          {this.props.d.title}
        </div>
        <img className="all-my-books-img" src={this.props.d.imageLinks.smallThumbnail} />
        <br />
      </div>
    )
  }

}