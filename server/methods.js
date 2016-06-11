import { BookData } from '../imports/api/bookData'
import { Mongo } from 'meteor/mongo';


Meteor.methods({

  'bookData.create'(username) {
    BookData.insert({"user": username, "books": [], "trades": {"offers": [], "requests": []}})
  },

  'bookData.addBook'(data) {
    if(Meteor.user()) {
      let d = BookData.findOne({user: Meteor.user().username});
      let books = d.books;
      for(let i = 0; i < books.length; i++) {
        if(books[i].canonicalVolumeLink === data.canonicalVolumeLink) {
          return "already"
        }
      }
      books.push(data);
      BookData.update(d._id, {$set: {books: books}})
    }
  }

});
