import KategoriModel from "../models/KategoriModel.js";
import db from "../config/Database.js";
import { Op } from "sequelize";

export const getKategori = async (req, res) => {
  try {
    let response;
    response = await KategoriModel.findAll({
      attributes: ["id", "nama", "keterangan"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKategoriById = async (req, res) => {
  try {
    const kategori = await KategoriModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!kategori) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    response = await KategoriModel.findOne({
      attributes: ["id", "nama", "keterangan"],
      where: {
        id: kategori.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKategori = async (req, res) => {
  const { nama, keterangan } = req.body;
  const transaction = await db.transaction();

  try {
    const count = await KategoriModel.count();

    if (count === 0) {
      await db.query("ALTER TABLE kategori AUTO_INCREMENT = 1", {
        transaction,
      });
    }

    const newKategori = await KategoriModel.create(
      {
        nama: nama,
        keterangan: keterangan,
      },
      { transaction }
    );

    await transaction.commit();
    console.log("New ID:", newKategori.id);
    res
      .status(201)
      .json({ msg: "Data Created Successfuly", id: newKategori.id });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ msg: error.message });
  }
};

export const updateKategori = async (req, res) => {
  try {
    const kategori = await KategoriModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!kategori) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama, keterangan } = req.body;
    await KategoriModel.update(
      { nama, keterangan },
      {
        where: {
          id: kategori.id,
        },
      }
    );
    res.status(200).json({ msg: "Data updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteKategori = async (req, res) => {
  try {
    const kategori = await KategoriModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!kategori) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama, keterangan } = req.body;
    await KategoriModel.destroy({
      where: {
        id: kategori.id,
      },
    });
    res.status(200).json({ msg: "Data deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getNextKategoriId = async (req, res) => {
  try {
    const maxIdResult = await KategoriModel.max("id");

    const nextId = maxIdResult ? maxIdResult + 1 : 1;
    console.log(nextId);
    res.status(200).json({ nextId });
  } catch (error) {
    console.error("Error fetching next ID:", error);
    res.status(500).json({ msg: error.message });
  }
};
