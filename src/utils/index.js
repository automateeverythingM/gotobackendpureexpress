const { nanoid } = require("nanoid");
const { MESSAGE_TYPE } = require("./actions");

/**
 *  Receiving event and pass data to all user in same room except emitter
 *
 * @param {socket} socket
 * @param {string} onEvent
 * @param {string} emitEvent
 * @param {string} roomName
 */
exports.socketOnReceiveEmit = (socket, onEvent, emitEvent, func) => {
  socket.on(onEvent, ({ roomName, ...rest }) => {
    if (func) func(roomName, rest);
    if (emitEvent) socket.to(roomName).emit(emitEvent, rest);
  });
};

exports.messageGenerator = (type, data) => {
  switch (type) {
    case MESSAGE_TYPE.USER_JOIN:
      return {
        type: { name: "SERVER", subType: "JOIN" },
        content: `${data.displayName} joined room.`,
        uid: nanoid(),
        user: data,
      };
    case MESSAGE_TYPE.USER_LEFT:
      return {
        type: { name: "SERVER", subType: "LEFT" },
        content: `${data.displayName} left room.`,
        uid: nanoid(),
        user: data,
      };

    default:
      break;
  }
};
