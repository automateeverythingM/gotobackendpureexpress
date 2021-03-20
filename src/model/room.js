class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
    this.messages = [];
  }

  addUser(user) {
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    this.users.filter((user) => user.socketId !== id);
    return user;
  }

  pushMessage(message) {
    this.messages.push(message);
  }

  get roomState() {
    return { messages: this.messages, users: this.users };
  }

  get isRoomEmpty() {
    return !!this.messages.length;
  }
}

module.exports = Room;
