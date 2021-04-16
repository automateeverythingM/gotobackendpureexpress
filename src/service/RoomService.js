const Room = require("../model/room");
const { roomStateDTO } = require("../model/DTO/roomStateDTO");
const User = require("../model/user");
const Message = require("../model/Message");
class RoomService {
  async userExistsOrCreateNew(user) {
    const existingUser = await User.findById(user.uid);
    if (existingUser) return existingUser;

    const newUser = await User.create({ ...user, _id: user.uid });
    await newUser.save((err) => console.error(err));
    return newUser;
  }

  async roomExistsOrCreateNew(roomName) {
    const isRoomExist = await Room.findOne({ name: roomName });

    if (isRoomExist) {
      return isRoomExist;
    }
    const newRoom = await Room.create({ name: roomName });
    return newRoom;
  }

  async userJoinRoom(roomName, user, callback) {
    const newUser = await this.userExistsOrCreateNew(user);
    const room = await this.roomExistsOrCreateNew(roomName);

    room.users.push(newUser);

    room.save(async function (err) {
      if (err) console.error(err);
      const DTO = await roomStateDTO(room);

      callback(DTO);
    });
  }

  async pushMessageToRoom(roomName, { user, ...message }, callback) {
    console.log(
      "🚀 ~ file: RoomService.js ~ line 42 ~ RoomService ~ pushMessageToRoom ~ message",
      message
    );
    const newMessage = new Message({ ...message, user });
    console.log(
      "🚀 ~ file: RoomService.js ~ line 43 ~ RoomService ~ pushMessageToRoom ~ newMessage",
      newMessage
    );

    newMessage.save(async function (err, message) {
      if (err) console.error(err);
      const room = await Room.findOne({ name: roomName });
      room.messages.push(newMessage);
      room.save((err) => {
        console.error(err);
      });
    });
  }

  async leaveRoom(roomName, user) {
    Room.findOneAndUpdate(
      { name: roomName },
      { $pull: { users: user.uid } },
      (err, room) => {
        if (err) console.error(err);
        // if (room) room.save();
      }
    );
  }
}

const instance = new RoomService();
Object.freeze(instance);

module.exports = instance;
