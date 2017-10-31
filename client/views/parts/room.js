import { Messages } from '../../../imports/api/messages.js';

Template.slapp_room.onCreated( function slappRoomOnCreated() {
    Meteor.autorun(() => {
        Meteor.subscribe('messages', Session.get("currentRoom"));
    });
});

Template.slapp_room.helpers({
    messages() {
        return Messages.find({room: this._id}, {limit: 30, sort: {time: -1}}).fetch().reverse();
    }
});

Template.slapp_message.helpers({
    ownMessage() {
        return ( this.author === Meteor.user()._id ) ? true : false;
    }
});

Template.slapp_author.helpers({
    displayName() {
        const user = Meteor.users.findOne(this.author);

        if( user.profile ) {
            return user.profile.name;
        }

        if( user.emails ) {
            return user.emails[0].address;
        }
    },
});

Template.slapp_compose_message.events({
    'submit #compose-message'(event, template) {
        event.preventDefault();
        if ( event.target.messageContent.value.length > 0 ) {
            Messages.insert({
                time: Date.now(),
                room: Template.instance().data._id,
                content: event.target.messageContent.value,
                author: Meteor.user()._id,
            });
            template.find("form").reset();
        }
    }
});