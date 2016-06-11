import { Mongo } from 'meteor/mongo';

export const BookData = new Mongo.Collection('bookData');


// {"user": "SHADOW", "books": [], "trades": {"offers": [], "requests": []}}