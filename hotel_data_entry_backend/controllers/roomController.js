import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../models/roomModel.js";

export async function createRoomCtrl(req, res, db) {
  const { number, type, price } = req.body;
  await createRoom(db, number, type, price);
  res.json({ message: "Room created" });
}

export async function getRoomsCtrl(req, res, db) {
  const rooms = await getAllRooms(db);
  res.json(rooms);
}

export async function getRoomCtrl(req, res, db) {
  const room = await getRoomById(db, req.params.id);
  res.json(room);
}

export async function updateRoomCtrl(req, res, db) {
  const { number, type, price } = req.body;
  await updateRoom(db, req.params.id, number, type, price);
  res.json({ message: "Room updated" });
}

export async function deleteRoomCtrl(req, res, db) {
  await deleteRoom(db, req.params.id);
  res.json({ message: "Room deleted" });
}
