import ArsipModel from "../models/ArsipModel.js";

export const getArsip = async (req, res) => {
  try {
    let response;
    response = await ArsipModel.findAll({
      attributes: ["uuid", "noSurat", "kategori", "judul", "waktu"],
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
      attributes: ["uuid", "noSurat", "kategori", "judul", "waktu"],
      where: {
        id: arsip.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createArsip = async (req, res) => {
  const { noSurat, kategori, judul, waktu } = req.body;
  try {
    await ArsipModel.create({
      noSurat: noSurat,
      kategori: kategori,
      judul: judul,
      waktu: waktu,
    });
    res.status(201).json({ msg: "Data Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateArsip = async (req, res) => {
  try {
    const arsip = await ArsipModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!arsip) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { noSurat, kategori, judul, waktu } = req.body;
    await ArsipModel.update(
      { noSurat, kategori, judul, waktu },
      {
        where: {
          id: arsip.id,
        },
      }
    );
    res.status(200).json({ msg: "Data updated successfuly" });
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
    const { noSurat, kategori, judul, waktu } = req.body;
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
