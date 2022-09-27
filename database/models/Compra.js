module.exports = (sequelize, dataTypes) => {
  const Compra = sequelize.define(
    "Compra",
    {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      cliente_id: {
        type: dataTypes.INTEGER(11),
      },
    },

    {
      tableName: "compras",
      timestamps: false,
    }
  );

  Compra.associate = (models) => {
    Compra.belongsTo(models.Cliente, {
      foreignKey: "cliente_id",
      as: "clientes",
      through: models.Cliente.ProdutoCompra,
    });
   
  };
  return Compra;
};
