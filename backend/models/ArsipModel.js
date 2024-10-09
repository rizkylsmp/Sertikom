import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kategori from "./KategoriModel.js";

const { DataTypes } = Sequelize;

const Arsip = db.define(
  "arsip",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    noSurat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kategoriId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Kategori.hasMany(Arsip);
Arsip.belongsTo(Kategori, { foreignKey: "kategoriId" });

export default Arsip;
