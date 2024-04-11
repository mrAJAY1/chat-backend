import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import http from "http";

// initialize dotenv
config();

const app = express();
const server = http.createServer(app);
const db = mongoose.connection;

if (process.env.MONGO_URI && process.env.MONGO_URI.trim() !== "") {
  void mongoose.connect(process.env.MONGO_URI);
} else {
  console.error("no mongo uri found");
}

db.once("open", () => {
  console.info("db established");
});

db.on("error", console.error.bind(console, "DB Connection ERROR: "));

(async () => {
  const { default: socket } = await import("./socket");
  socket(server);
})();

const PORT = Number(process.env.PORT) ?? 3000;

app.listen(PORT, () => {
  console.info(`API listening on port ${PORT}`);
});

server.listen(PORT + 1, () => {
  console.info(`Socket listening on port ${PORT + 1}`);
});
