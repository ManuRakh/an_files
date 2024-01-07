const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequilize.db.js");

const Files = sequelize.define(
  "files",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    filename: {
      type: DataTypes.STRING,
    },
    encrypted_data: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    tableName: "files",
  },
);

module.exports = Files;
