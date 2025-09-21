import {
  createReservation,
  getAllReservations,
  getReservationById,
  deleteReservation,
} from "../models/reservationModel.js";

export async function createReservationCtrl(req, res, db) {
  const { room_id, check_in, check_out } = req.body;
  const user_id = req.user.id;
  await createReservation(db, user_id, room_id, check_in, check_out);
  res.json({ message: "Reservation created" });
}

export async function getReservationsCtrl(req, res, db) {
  const reservations = await getAllReservations(db);
  res.json(reservations);
}

export async function getReservationCtrl(req, res, db) {
  const reservation = await getReservationById(db, req.params.id);
  if (!reservation) return res.status(404).json({ error: "Not found" });

  if (req.user.role !== "admin" && reservation.user_id !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  res.json(reservation);
}

export async function deleteReservationCtrl(req, res, db) {
  await deleteReservation(db, req.params.id);
  res.json({ message: "Reservation deleted" });
}
