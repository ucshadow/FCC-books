import { Meteor } from 'meteor/meteor';
import { BookData } from '../imports/api/bookData'

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.users.after.insert(function () {
  let username = (Meteor.users.findOne({_id: this._id}).username);
  BookData.insert({"user": username, "books": [], "trades": {"offers": [], "requests": []}});
});
