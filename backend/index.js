import express from "express";
import cors from "cors";
import connect from "./connect/connect.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./router/routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

dotenv.config();

// Serve static files

const PORT = 4000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  connect();
  console.log(`server started on ${PORT}`);
});
