module.exports = (sequelize, dataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      id_produto:{
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
       
      },
      slug:{
        type:dataTypes.STRING
      },
      nome: {
        type: dataTypes.STRING(100),
        allowNull: false
      },
      preco: {
        type: dataTypes.DECIMAL,
        allowNull: false
      },
      descricao:{
        type:dataTypes.STRING
      },
      quantidade:{
        type: dataTypes.INTEGER
      },
      imagem: {
        type: dataTypes.STRING
      },
      fk_categoria:{
        type: dataTypes.BIGINT(10).UNSIGNED
      },
      promocao: {
        type: dataTypes.INTEGER
      },
      preco_promocao: {
        type: dataTypes.DECIMAL
      }
    }
      
    ,{
      tableName: "produtos",
      timestamps: false
    }
  );
  
Produto.associate = (models) => {
  Produto.belongsTo(models.Categoria, {
    foreignKey: "fk_categoria",
    as: "categorias",
  });
 

  };

  return Produto;
}




