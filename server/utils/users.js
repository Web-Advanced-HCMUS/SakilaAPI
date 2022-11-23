const users = [];

const addUser = ({ name, user, room, host, presenter }) => {
  const newUser = { name, user, room, host, presenter };

  users.push(newUser);
  return users;
};

const removeUser = ({ user }) => {
  //   const users = users.filter((user) => user.user !== user);
  const index = users.findIndex((e) => e.user === user);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = ({ user }) => {
  return users.find((e) => e.user === user);
};

const getUsersInRoom = ({ room }) => {
  const roomUsers = users.filter((user) => user.room === room);
  return roomUsers;
};

const getUsers = () => users;

export { addUser, removeUser, getUser, getUsersInRoom, getUsers };
