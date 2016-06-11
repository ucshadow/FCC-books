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
  },

  'bookData.addUserComment'(u, c, b) {
    let d = BookData.findOne({user: u});
    let books = d.books;
    for(let x = 0; x < books.length; x++) {
      if(books[x].title === b) {
        if(books[x].userComments) {
          books[x].userComments.push([u, c])
        } else {
          books[x].userComments = [[u, c]]
        }
      }
    }
    BookData.update(d._id, {$set: {books: books}});
  },

  'bookData.addOffer'(u, t, u_title, t_title) {
    let trade = {you: [u, u_title], tar: [t, t_title]};
    let you = BookData.findOne({user: u});
    let offers = you.trades.offers;

    function containsObject(obj, list) {
      for(let i = 0; i < list.length; i++) {
        if (list[i].tar.toString() === obj.tar.toString() && list[i].you.toString() === obj.you.toString()) {
          return true;
        }
      }
      return false;
    }

    if(!containsObject(trade, offers)) {
      offers.push(trade);
      BookData.update(you._id, {$set: {trades: {offers: offers, requests: you.trades.requests}}}, {upsert: true});

      let tradeInverted = {tar: [u, u_title], you: [t, t_title]};
      let him = BookData.findOne({user: t});
      let requests = him.trades.requests;
      requests.push(tradeInverted);
      BookData.update(him._id, {$set: {trades: {offers: him.trades.offers, requests: requests}}}, {upsert: true});
    }
  }

});
