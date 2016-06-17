import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
//import { YourCustomCollection } from '../imports/api/yourCustomCollection.js';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import About from '../imports/ui/About.jsx';
import NotFound from '../imports/ui/NotFound.jsx';
import MyBooks from '../imports/ui/MyBooks.jsx';
import AddBook from '../imports/ui/AddBook.jsx';
import AllBooks from '../imports/ui/AllBooks.jsx';
import Profile from '../imports/ui/Profile.jsx';


export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="about" component={ About } />
      <Route path="myBooks" component={ MyBooks } />
      <Route path="addBook" component={ AddBook } />
      <Route path="allBooks" component={ AllBooks } />
      <Route path="profile" component={ Profile } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
);


Meteor.startup(() => {

  /*Meteor.subscribe('voteData', {
    onReady: function(){
      //onSubscriptionReady trigger
    }
  });*/

  render(renderRoutes(), document.getElementById('app'));

});