import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    Meteor.publish('messages', function messagesPublication(room) {
        if ( Meteor.userId() ) {
            return Messages.find({room: room});
        }
    });
}

export const Messages = new Mongo.Collection('messages');