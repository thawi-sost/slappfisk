import { Rooms } from '../../imports/api/rooms.js';

Template.slapp_layout.helpers({
    currentRoom() {
        const roomID = Session.get("currentRoom");
        const room = Rooms.findOne(roomID);
        return room;
    },
});