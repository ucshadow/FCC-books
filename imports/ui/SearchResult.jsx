import React, { Component, PropTypes } from 'react'


export default class SearchResult extends Component {

  constructor(props) {
    super(props);

    this.checkProps = this.checkProps.bind(this);
    this.addThis = this.addThis.bind(this);
  }

  addThis() {
    let alert = $("#alerts");
    let allData = this.props.d.volumeInfo;
    if(Meteor.user()) {
      Meteor.call("bookData.addBook", allData, function(err, res) {
        if(err) {
          console.log(err);
        }
        if(res === "already") {
          alert.text("You already have that book in your collection!")
        } else {
          alert.text("Added " + allData.title + " to your collection");
        }
      });
    } else {
      alert.text("Please Log In to add a book")
    }
  }

  checkProps() {
    let img;
    if(this.props.d.volumeInfo.imageLinks) {
      let a = this.props.d.volumeInfo.imageLinks.smallThumbnail;
      let b = a.split(":")[0] + "s:";
      img = b + a.split(":")[1]
    }
    if(this.props.d) {
      return (
        <div onClick={this.addThis}>
          <img className="search-result-img" src={this.props.d.volumeInfo.imageLinks ?
          img : null} />
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="single-book-result">
        {this.checkProps()}
      </div>
    )
  }
}