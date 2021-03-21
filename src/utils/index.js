/**
 *  Receiving event and pass data to all user in same room except emitter
 *
 * @param {socket} socket
 * @param {string} onEvent
 * @param {string} emitEvent
 * @param {string} roomName
 */
exports.socketOnReceiveEmit = (socket, onEvent, emitEvent, roomName) => {
  console.log(
    "🚀 ~ file: index.js ~ line 2 ~ socketOnReceiveEmit ~ onEvent",
    onEvent
  );
  socket.to(roomName).on(onEvent, (...args) => {
    socket.to(roomName).emit(emitEvent, ...args);
  });
};
