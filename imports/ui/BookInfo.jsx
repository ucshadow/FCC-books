import React, { Component, PropTypes } from 'react'

import { BookData } from '../api/bookData'

export default class BookInfo extends Component {

  constructor() {
    super();

    this.showInfo = this.showInfo.bind(this);
    this.clear = this.clear.bind(this);
    this.preview = this.preview.bind(this);
    this.tradeBook = this.tradeBook.bind(this);
  }

  showInfo(e, arg) {
    let a = e.target.parentElement;
    let info = document.createElement("DIV");
    info.setAttribute("class", "info");
    if(arg === "d") {
      info.innerHTML = this.props.d.description;
    }
    else if(arg === "o") {
      let com = this.props.d.userComments;
      if(com) {
        let all = $.map(com, function(n) {
          return n
        });
        info.innerHTML = all.join(" -- ");
      } else {
        info.innerHTML = "no user comments";
      }
    }
    a.appendChild(info);
  }

  clear() {
    $(".info").remove();
  }

  preview() {
    let url = this.props.d.previewLink;
    window.open(url,'_blank');
  }

  tradeBook(e) {
    let title = this.props.d.title;
    let user = Meteor.user().username;
    let currentOwner = this.props.user;
    if(user !== currentOwner) {
      let myBooks = BookData.find({user: Meteor.user().username}).fetch();
      let a = e.target.parentElement;
      let info = document.createElement("DIV");
      info.setAttribute("class", "info");
      info.innerHTML = "Choose a book to trade";
      myBooks[0].books.map(function(book) {
        let button = document.createElement("BUTTON");
        button.setAttribute("class", 'my-books-for-trade');
        button.innerHTML = book.title;
        button.onclick = function() {
          Meteor.call("bookData.addOffer", user, currentOwner, title, book.title);
        };
        info.appendChild(button);
      });
      a.appendChild(info);
    } else {
      console.log("you can't trade with yourself");
    }
  }

  render() {
    return (
      <div className="single-book" onMouseLeave={this.clear}>
        <div id="r-w-d" style={{position: "relative"}}>
          <div className="book-title">
            {this.props.d.title}
          </div>
          <img className="all-my-books-img" src={this.props.d.imageLinks.smallThumbnail} />
          <div className="book-facts">
            <div className="book-author">
              {(this.props.d.authors.length > 1 ? "Authors: " : "Author: ")} {this.props.d.authors.join(" ")}
            </div>
            <div className="book-published-date">
              Publish date: {this.props.d.publishedDate}
            </div>
            <div className="book-category" >
              Category: {this.props.d.categories.join(" ")}
            </div>
            <div className="book-page-count">
              Page Count: {this.props.d.pageCount}
            </div>
          </div>
          <div className="book-owner">
            Owner: {this.props.user}
          </div>
        </div>
        <button className="trade-button" onClick={(e) => this.tradeBook(e)}> Trade </button>
        <button className="preview-button" onClick={this.preview}> Preview </button>
        <button className="description-button" onClick={(e) => this.showInfo(e, "d")}> Description </button>
        <button className="owner-opinion-button" onClick={(e) => this.showInfo(e, "o")}> Owner Opinion </button>
      </div>
    )
  }
}