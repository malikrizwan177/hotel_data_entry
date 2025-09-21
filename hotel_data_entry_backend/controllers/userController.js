import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getAllUsers,
  getUserByUsername,
  deleteUser,
} from "../models/userModel.js";

export async function registerUserCtrl(req, res, db) {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    await createUser(db, username, hashed, role);
    res.json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: "Username already exists" });
  }
}

export async function loginUserCtrl(req, res, db) {
  const { username, password } = req.body;
  const user = await getUserByUsername(db, username);
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
}

export async function getUsersCtrl(req, res, db) {
  const users = await getAllUsers(db);
  res.json(users);
}

export async function deleteUserCtrl(req, res, db) {
  await deleteUser(db, req.params.id);
  res.json({ message: "User deleted" });
}
