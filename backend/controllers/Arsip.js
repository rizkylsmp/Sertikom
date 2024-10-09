import ArsipModel from "../models/ArsipModel.js";
import Kategori from "../models/KategoriModel.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export const getArsip = async (req, res) => {
  try {
    let response;
    response = await ArsipModel.findAll({
      attributes: ["uuid", "noSurat", "judul", "file", "createdAt"],
      include: [
        {
          model: Kategori,
          attributes: ["nama"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getArsipById = async (req, res) => {
  try {
    const arsip = await ArsipModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!arsip) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    response = await ArsipModel.findOne({
      attributes: ["uuid", "noSurat", "judul", "file", "createdAt"],
      where: {
        id: arsip.id,
      },
      include: [
        {
          model: Kategori,
          attributes: ["nama"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createArsip = async (req, res) => {
  const { noSurat, judul, kategoriId } = req.body;
  const file = req.file ? req.file.filename : null;

  if (!noSurat || !judul || !kategoriId) {
    return res
      .status(400)
      .json({ msg: "NoSurat, Judul, and KategoriId are required" });
  }

  try {
    await ArsipModel.create({ noSurat, kategoriId, judul, file });
    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateArsip = async (req, res) => {
  try {
    const arsip = await ArsipModel.findOne({
      where: { uuid: req.params.id },
    });
    if (!arsip) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { noSurat, judul } = req.body;
    const file = req.file ? req.file.filename : arsip.file;

    const updateData = {
      ...(noSurat && { noSurat }),
      ...(judul && { judul }),
      file,
    };

    await ArsipModel.update(updateData, {
      where: { id: arsip.id },
    });
    res.status(200).json({ msg: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteArsip = async (req, res) => {
  try {
    const arsip = await ArsipModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!arsip) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { noSurat, judul } = req.body;
    await ArsipModel.destroy({
      where: {
        id: arsip.id,
      },
    });
    res.status(200).json({ msg: "Data deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
