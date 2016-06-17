import React from 'react'


export default class About extends React.Component {

  render() {
    return (
      <div className="about-container">
        <span>
          A site made by Catalin for freecodecamp.com -- Manage a Book Trading Club
        </span>
        <br />
        The site uses:
        <ul>
          <li>
            Meteor
          </li>
          <li>
            MongoDB
          </li>
          <li>
            React
          </li>
          <li>
            React Router
          </li>
        </ul>
        <span>
          Default login:
          <br />
          Username: Creator
          <br />
          Password: creator
        </span>
        <br />
        <br />
        <a href="https://github.com/ucshadow/FCC-books.git"> Github Repo </a>
      </div>
    )
  }
}