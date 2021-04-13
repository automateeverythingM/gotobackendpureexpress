exports.roomStateDTO = (room) => {
  return { usersList: room.users, messages: room.messages };
};
