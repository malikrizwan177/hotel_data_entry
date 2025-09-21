export const createRoom = async (db, number, type, price) => {
  return db.run(
    "INSERT INTO rooms (number, type, price) VALUES (?, ?, ?)",
    [number, type, price]
  );
};

export const getAllRooms = async (db) => {
  return db.all("SELECT * FROM rooms");
};

export const getRoomById = async (db, id) => {
  return db.get("SELECT * FROM rooms WHERE id = ?", [id]);
};

export const updateRoom = async (db, id, number, type, price) => {
  return db.run("UPDATE rooms SET number = ?, type = ?, price = ? WHERE id = ?", [
    number,
    type,
    price,
    id,
  ]);
};

export const deleteRoom = async (db, id) => {
  return db.run("DELETE FROM rooms WHERE id = ?", [id]);
};

