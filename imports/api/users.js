import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    Meteor.publish('Meteor.users.name', function () {
        if ( Meteor.userId() ) {
            return Meteor.users.find({}, {fields: {"profile.name": 1, "emails": 1}});
        }
    });
}

// export const Users = new Mongo.Collection('users');