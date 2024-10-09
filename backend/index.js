import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import ArsipRoute from "./routes/ArsipRoute.js";
import KategoriRoute from "./routes/KategoriRoute.js";

dotenv.config();

const app = express();

// (async () => {
//   await db.sync();
// })();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use(ArsipRoute);
app.use(KategoriRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});

(async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();