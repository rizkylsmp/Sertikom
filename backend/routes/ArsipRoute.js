import express from "express";
import upload from "../config/Multer.js";
import {
  getArsip,
  getArsipById,
  createArsip,
  updateArsip,
  deleteArsip,
} from "../controllers/Arsip.js";

const router = express.Router();

router.get("/arsip", getArsip);
router.get("/arsip/:id", getArsipById);
router.post("/arsip", upload.single("file"), createArsip);
router.put("/arsip/:id/upload", upload.single("file"), updateArsip);
router.delete("/arsip/:id", deleteArsip);

export default router;
