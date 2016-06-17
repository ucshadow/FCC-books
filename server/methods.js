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
    let _id_ = Math.random();
    let trade = {you: [u, t_title], tar: [t, u_title], _id_: _id_};
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
      BookData.update(you._id, {$set: {trades: {offers: offers, requests: you.trades.requests}}});

      let him = BookData.findOne({user: t});
      let requests = him.trades.requests;
      requests.push(trade);
      BookData.update(him._id, {$set: {trades: {offers: him.trades.offers, requests: requests}}});
    }
  },

  'bookData.refuseTrade'(trade) {
    let tradeId = trade._id_;
    if(Meteor.user().username === trade.you[0] || Meteor.user().username === trade.tar[0]) {
      let y = BookData.findOne({user: trade.you[0]});
      let trades = y.trades;
      let offers = trades.offers;
      for(let i = 0; i < offers.length; i++) {
        if(offers[i]._id_ === tradeId) {
          offers.splice(i, 1);
          trades.offers = offers;
        }
      }
      BookData.update(y._id, {$set: {trades: trades}});

      let t = BookData.findOne({user: trade.tar[0]});
      let trades2 = t.trades;
      let requests = trades2.requests;
      for(let i = 0; i < requests.length; i++) {
        if(requests[i]._id_ === tradeId) {
          requests.splice(i, 1);
          trades2.requests = requests;
        }
      }
      BookData.update(t._id, {$set: {trades: trades2}});
    }

  },

  'bookData.acceptTrade'(trade) {

    let tradeId = trade._id_;
    if(Meteor.user().username === trade.you[0] || Meteor.user().username === trade.tar[0]) {
      let yy = BookData.findOne({user: trade.you[0]});
      let trades = yy.trades;
      let offers = trades.offers;
      for(let i = 0; i < offers.length; i++) {
        if(offers[i]._id_ === tradeId) {
          offers.splice(i, 1);
          trades.offers = offers;
        }
      }
      BookData.update(yy._id, {$set: {trades: trades}});

      let tt = BookData.findOne({user: trade.tar[0]});
      let trades2 = tt.trades;
      let requests = trades2.requests;
      for(let i = 0; i < requests.length; i++) {
        if(requests[i]._id_ === tradeId) {
          requests.splice(i, 1);
          trades2.requests = requests;
        }
      }
      BookData.update(tt._id, {$set: {trades: trades2}});
    }

    let username = Meteor.user().username;
    let target = trade.tar[0];
    let you = trade.you[0];
    let targetBook = trade.tar[1];
    let yourBook = trade.you[1];
    if(username === trade.tar[0]) {
      target = trade.you[0];
      you = trade.tar[0];
      targetBook = trade.you[1];
      yourBook = trade.tar[1];
    }

    let y = BookData.findOne({user: you});
    let yBooks = y.books;
    let yourSwapBookIndex;
    for(let i = 0; i < yBooks.length; i++) {
      if(yBooks[i].title === yourBook) {
        yourSwapBookIndex = i;
        break;
      }
    }
    //BookData.update(y._id, {$set: {books: yBooks}});

    let t = BookData.findOne({user: target});
    let tBooks = t.books;
    let targetSwapBookIndex;
    for(let i = 0; i < tBooks.length; i++) {
      if(tBooks[i].title === targetBook) {
        targetSwapBookIndex = i;
        break;
      }
    }

    let a = yBooks[yourSwapBookIndex];
    yBooks[yourSwapBookIndex] = tBooks[targetSwapBookIndex];
    tBooks[targetSwapBookIndex] = a;


    BookData.update(y._id, {$set: {books: yBooks}});
    BookData.update(t._id, {$set: {books: tBooks}});

  },

  'updateUserAddress'(id, address) {
    if(id === Meteor.userId()) {
      Meteor.users.update({_id: id}, {$set: {profile: address}});
    }
  }

});
