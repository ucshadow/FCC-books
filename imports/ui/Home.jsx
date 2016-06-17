import React, { Component, PropTypes } from 'react'

export default class Home extends Component {

  render() {
    return (
      <div className="landing-page">
        <div className="banner">
        </div>
        <div className="welcome-screen">
          <span className="welcome-title">Welcome to your virtual Library</span>
          <span className="welcome-description"> Log In to add, comment, and trade books with other users </span>
        </div>
      </div>
    )
  }
}