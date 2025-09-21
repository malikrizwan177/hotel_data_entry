import express from "express";
import {
  createReservationCtrl,
  getReservationsCtrl,
  getReservationCtrl,
  deleteReservationCtrl,
} from "../controllers/reservationController.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";

export default function reservationRoutes(db) {
  const router = express.Router();

  router.post("/", authenticateToken, (req, res) =>
    createReservationCtrl(req, res, db)
  );

  router.get("/", authenticateToken, requireRole("admin"), (req, res) =>
    getReservationsCtrl(req, res, db)
  );

  router.get("/:id", authenticateToken, (req, res) =>
    getReservationCtrl(req, res, db)
  );

  router.delete("/:id", authenticateToken, requireRole("admin"), (req, res) =>
    deleteReservationCtrl(req, res, db)
  );

  return router;
}
