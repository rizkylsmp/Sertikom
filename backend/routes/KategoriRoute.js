import express from "express";
import {
  getKategori,
  getKategoriById,
  createKategori,
  updateKategori,
  deleteKategori,
  getNextKategoriId,
} from "../controllers/Kategori.js";

const router = express.Router();

router.get("/kategori", getKategori);
router.get("/kategori/:id", getKategoriById);
router.get("/nextkategori", getNextKategoriId);
router.post("/kategori", createKategori);
router.patch("/kategori/:id", updateKategori);
router.delete("/kategori/:id", deleteKategori);

export default router;
