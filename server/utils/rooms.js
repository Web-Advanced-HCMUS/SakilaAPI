// room = {
//   id: "###",
//   rooms: [1, 2, 3],
//   board: "#img"
// };

// rooms = [room1, room2, room3, ....]
const rooms = [];

const addRoom = ({ room }) => {
  const newRoom = { room, canvasImage: "" };
  rooms.push(newRoom);
  return rooms; 
};

const updateRoom = ({ room, canvasImage }) => {
  const index = rooms.findIndex((e) => e.room === room);
  if (index !== -1)
    rooms[index].canvasImage = canvasImage;
};

const removeRoom = ({ room }) => {
  const index = rooms.findIndex((e) => e.room === room);
  if (index !== -1) rooms.splice(index, 1)[0];
  return rooms;
};

const getRoom = ({ room }) => {
  return rooms.find((e) => e.room === room);
};

export { addRoom, updateRoom, removeRoom, getRoom };
