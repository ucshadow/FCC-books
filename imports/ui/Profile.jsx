import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'


class Profile extends Component {

  constructor() {
    super();

    this.displayUserInfo = this.displayUserInfo.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  displayUserInfo() {
    return (
      <div className="user-info" key="d1g23h5fds5">
        Username: {Meteor.user().username}
        <br />
        {(Meteor.user().profile ? this.addressData() : null)}
        <div className="change-profile-inputs">
          <input type="text" id="country" className="input-field" placeholder="Country" />
          <input type="text" id="state" className="input-field" placeholder="State/County" />
          <input type="text" id="city" className="input-field" placeholder="City" />
          <button className="search-button" onClick={this.submitData}> Submit </button>
        </div>
      </div>
    )
  }

  addressData() {
    return (
      <div>
        <div> Country: {Meteor.user().profile[0]} </div>
        <div> State / County: {Meteor.user().profile[1]} </div>
        <div>City: {Meteor.user().profile[2]} </div>
      </div>
    )
  }

  submitData() {
    let address = [$("#country").val(), $("#state").val(), $("#city").val()];
    Meteor.call("updateUserAddress", Meteor.userId(), address)
  }

  render() {
    return (
      <div className="user-info">
        {this.props.user.map((u) => {
          return (u ? this.displayUserInfo() : (Meteor.user() ? "Loading..." : "Please Log In to access your profile"))
          })}
      </div>
    )
  }
}


Profile.propTypes = {
  user: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    user: [Meteor.user()]
  };
}, Profile);