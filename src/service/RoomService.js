const Room = require("../model/room");
const RoomRepository = require("../repository/roomRepository");
const { roomStateDTO } = require("../model/DTO/roomStateDTO");
class RoomService {
  async userJoinRoom(roomName, user) {
    const isRoomExist = await Room.findOne({ name: roomName });

    if (isRoomExist) {
      isRoomExist.users.push(user);

      console.log("room already exist");
      //TODO: debug return
      isRoomExist.save();
      return roomStateDTO(isRoomExist);
    }

    console.log("New room");

    const newRoom = Room.create({ name: roomName });
    newRoom.users.push(user);

    newRoom.save();
    return roomStateDTO(newRoom);
  }

  async pushMessageToRoom(roomName, message) {
    const room = await Room.findOne(roomName, message);
    room.messages.push(message);

    room.save();
  }

  async leaveRoom(roomName, user) {
    const room = await Room.findOne(roomName, message);

    room.users.pull({ uid: user.uid });

    if (selectedRoom.isRoomEmpty) {
      RoomRepository.removeRoom(roomName);
    }

    room.save();
  }
}

const instance = new RoomService();
Object.freeze(instance);

module.exports = instance;
