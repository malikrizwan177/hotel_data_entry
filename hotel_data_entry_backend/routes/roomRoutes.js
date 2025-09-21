import express from "express";
import {
  createRoomCtrl,
  getRoomsCtrl,
  getRoomCtrl,
  updateRoomCtrl,
  deleteRoomCtrl,
} from "../controllers/roomController.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";

export default function roomRoutes(db) {
  const router = express.Router();

  router.post("/", authenticateToken, requireRole("admin"), (req, res) =>
    createRoomCtrl(req, res, db)
  );

  router.get("/", authenticateToken, (req, res) => getRoomsCtrl(req, res, db));
  router.get("/:id", authenticateToken, (req, res) => getRoomCtrl(req, res, db));

  router.put("/:id", authenticateToken, requireRole("admin"), (req, res) =>
    updateRoomCtrl(req, res, db)
  );

  router.delete("/:id", authenticateToken, requireRole("admin"), (req, res) =>
    deleteRoomCtrl(req, res, db)
  );

  return router;
}
