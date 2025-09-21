import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initDb from "./config/db.js";

import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

initDb().then((db) => {
  console.log("SQLite database ready ✅");

  app.use("/api/rooms", roomRoutes(db));
  app.use("/api/users", userRoutes(db));
  app.use("/api/reservations", reservationRoutes(db));
});

app.get("/", (req, res) => {
  res.send("Hotel Data Entry Backend Running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
