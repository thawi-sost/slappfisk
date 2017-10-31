import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    Meteor.publish('rooms', function roomsPublication() {
        if ( Meteor.userId() ) {
            return Rooms.find();
        }
    });
}

export const Rooms = new Mongo.Collection('rooms');