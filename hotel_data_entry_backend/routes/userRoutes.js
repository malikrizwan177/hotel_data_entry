import express from "express";
import {
  registerUserCtrl,
  loginUserCtrl,
  getUsersCtrl,
  deleteUserCtrl,
} from "../controllers/userController.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";

export default function userRoutes(db) {
  const router = express.Router();

  router.post("/register", (req, res) => registerUserCtrl(req, res, db));
  router.post("/login", (req, res) => loginUserCtrl(req, res, db));

  router.get("/", authenticateToken, requireRole("admin"), (req, res) =>
    getUsersCtrl(req, res, db)
  );

  router.delete("/:id", authenticateToken, requireRole("admin"), (req, res) =>
    deleteUserCtrl(req, res, db)
  );

  return router;
}
