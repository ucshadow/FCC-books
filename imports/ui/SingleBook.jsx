import React, { Component, PropTypes } from 'react'


export default class SingleBook extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.d);
    this.bookInfo = this.bookInfo.bind(this);
  }

  bookInfo() {
    return this.props.d.map((singleBook) => {
      return <ParseBook key={Math.random()} d={singleBook} />
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
    super(props);

    this.state = {commenting: false};
    this.addComment = this.addComment.bind(this);
    this.showInputBox = this.showInputBox.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  addComment() {
    this.setState({commenting: true})
  }

  showInputBox() {
    if(this.state.commenting) {
      return (
        <div className="comment-input">
          <textarea name="user-comment" id="user-comment" />
        </div>
      )
    } else {
      return null;
    }
  }

  submitComment() {
    let user = Meteor.user().username;
    let book = this.props.d.title;
    let comment = null;
    let checkComment = $("#user-comment").val();
    if ($.trim(checkComment)) {
      comment = checkComment;
    }
    if(comment) {
      //console.log(user, comment, book, identifier);
      Meteor.call("bookData.addUserComment", user, comment, book)
    }
    this.setState({commenting: false})
  }

  render() {
    return (
      <div className="single-book">
        <div className="book-title">
          {this.props.d.title}
        </div>
        <img className="all-my-books-img" src={this.props.d.imageLinks.smallThumbnail} />
        <button className="trade-button" onClick={this.addComment} > Comment </button>
        {this.state.commenting ? <button className="preview-button" onClick={this.submitComment}> Submit </button> :
          null}
        {this.showInputBox()}
      </div>
    )
  }

}