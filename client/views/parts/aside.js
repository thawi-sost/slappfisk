import { Template } from 'meteor/templating';
import { Rooms } from '../../../imports/api/rooms.js';

Template.slapp_aside.onCreated(() => {
    Meteor.subscribe('rooms');
});

Template.slapp_aside.helpers({
    rooms() {
        return Rooms.find({});
    },
    isLoggedIn() {
        return ( Meteor.userId() ) ? true : false;
    },
});

Template.slapp_aside.events({
    'submit .add-room'(event, template) {
        event.preventDefault();
        Rooms.insert({ title: event.target.name.value });
        template.find("form").reset();
    },
})

Template.slapp_room_item.helpers({
    isActive() {
        if( Session.get("currentRoom") === Template.instance().data._id ) {
            return true;
        } else {
            return false;
        }
    },
});

Template.slapp_room_item.events({
    'click .delete-room'(event) {
        Rooms.remove( Template.instance().data._id );
    },
    'click .open-room'(event) {
        Session.set('currentRoom', Template.instance().data._id);
    },
});