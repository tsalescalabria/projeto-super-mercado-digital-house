module.exports = (sequelize, dataTypes) => {
    const ProdutoCompra = sequelize.define(
      "ProdutoCompra",
      {
        compra_id:{
         type: dataTypes.INTEGER
        },
        produto_id:{
          type: dataTypes.INTEGER
        },
        quantidade:{
            type: dataTypes.INTEGER
        },
        preco:{
            type:dataTypes.FLOAT
        }
      }
        
      ,{
        tableName: "produto_compra",
        timestamps:false
      }
    );
    
    ProdutoCompra.associate = (models) => {
        ProdutoCompra.belongsTo(models.Compra)
        ProdutoCompra.belongsTo(models.Produto)
}
  
  
  
  
    return ProdutoCompra;
  };