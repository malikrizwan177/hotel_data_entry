export const createReservation = async (db, user_id, room_id, check_in, check_out) => {
  return db.run(
    "INSERT INTO reservations (user_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?)",
    [user_id, room_id, check_in, check_out]
  );
};

export const getAllReservations = async (db) => {
  return db.all(`
    SELECT r.id, u.name as user, rm.number as room, r.check_in, r.check_out
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN rooms rm ON r.room_id = rm.id
  `);
};

export const getReservationById = async (db, id) => {
  return db.get(
    `SELECT r.id, u.name as user, rm.number as room, r.check_in, r.check_out
     FROM reservations r
     JOIN users u ON r.user_id = u.id
     JOIN rooms rm ON r.room_id = rm.id
     WHERE r.id = ?`,
    [id]
  );
};

export const updateReservation = async (db, id, check_in, check_out) => {
  return db.run("UPDATE reservations SET check_in = ?, check_out = ? WHERE id = ?", [
    check_in,
    check_out,
    id,
  ]);
};

export const deleteReservation = async (db, id) => {
  return db.run("DELETE FROM reservations WHERE id = ?", [id]);
};
