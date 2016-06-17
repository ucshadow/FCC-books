import React from 'react'

import { Link } from 'react-router'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


export default class App extends React.Component {

  render() {
    return (
      <div className="main-container">
        <div className="whole-nav">
          <nav role="navigation" className="navbar navbar-default" style={{
          background: "none", border: "none"}}>
            <div id="navbarCollapse" className="collapse navbar-collapse">
              <div className="nav navbar-nav">
                <div className="nav-button"><Link to="/" > Home </Link></div>
                <div className="nav-button"><Link to="/myBooks"> My Books </Link></div>
                <div className="nav-button"><Link to="/addBook"> Add Book </Link></div>
                <div className="nav-button"><Link to="/allBooks"> All Books </Link></div>
                <div className="nav-button"><Link to="/profile"> Profile </Link></div>
                <div className="nav-button"><Link to="/about"> About </Link></div>
                <AccountsUIWrapper />
              </div>
            </div>
          </nav>
      </div>
        <div className="book-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}