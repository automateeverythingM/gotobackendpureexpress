const Room = require("../model/room");
class RoomRepository {
  constructor() {
    this.roomList = [];
  }

  saveRoom(roomName) {
    const newRoom = new Room(roomName);
    this.roomList.push(newRoom);
    return newRoom;
  }

  findRoomByName(roomName) {
    return this.roomList.find((x) => x.name === roomName);
  }

  isRoomExist(roomName) {
    return this.findRoomByName(roomName) || false;
  }
}

const instance = new RoomRepository();

Object.freeze(instance);

module.exports = instance;
