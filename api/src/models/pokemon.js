const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ataque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    altura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen:{
      type:DataTypes.STRING,
      allowNull:false
    },
    tipo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
    {
      timestamps: false,
      freezeTableName: true
    });
};
