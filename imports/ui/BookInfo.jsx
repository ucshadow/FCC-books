import React, { Component, PropTypes } from 'react'

export default class BookInfo extends Component {

  constructor() {
    super();

    this.showInfo = this.showInfo.bind(this);
    this.clear = this.clear.bind(this);
  }

  showInfo(e, arg) {
    let a = e.target.parentElement;
    let info = document.createElement("DIV");
    info.setAttribute("class", "info");
    info.innerHTML = this.props.d.description;
    a.appendChild(info);
  }

  clear() {
    $(".info").remove();
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
        <button className="trade-button"> Trade </button>
        <button className="preview-button"> Preview </button>
        <button className="description-button" onClick={(e) => this.showInfo(e, "d")}> Description </button>
        <button className="owner-opinion-button"> Owner Opinion </button>
      </div>
    )
  }
}