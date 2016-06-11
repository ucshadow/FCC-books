import { BookData } from '../imports/api/bookData'


Meteor.publish('bookData', function votePublish() {
  return BookData.find();
});