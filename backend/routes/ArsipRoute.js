import express from "express";
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
router.post("/arsip", createArsip);
router.patch("/arsip/:id", updateArsip);
router.delete("/arsip/:id", deleteArsip);

export default router;
