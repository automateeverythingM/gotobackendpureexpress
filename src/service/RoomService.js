const RoomRepository = require("../repository/roomRepository");
class RoomService {
  userJoinRoom(roomName, user) {
    console.log(
      "🚀 ~ file: RoomService.js ~ line 4 ~ RoomService ~ userJoinRoom ~ user",
      user
    );
    const isRoomExist = RoomRepository.isRoomExist(roomName);

    if (isRoomExist) {
      isRoomExist.addUser(user);
      console.log("room already exist");
      return isRoomExist.roomState;
    } else {
      console.log("room created");
      const room = RoomRepository.saveRoom(roomName);
      room.addUser(user);

      return room.roomState;
    }
  }

  pushMessageToRoom(roomName, message) {
    const room = RoomRepository.findRoomByName(roomName);

    room.pushMessage(message);
  }
}

const instance = new RoomService();
Object.freeze(instance);

module.exports = instance;
