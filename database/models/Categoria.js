module.exports = (sequelize, dataTypes) => {
  const Categoria = sequelize.define(
    "Categoria",
    {
      id_categoria: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        
      },
      nome: {
        type: dataTypes.STRING(100),
        allowNull: false
      }
     
      
    },{
      tableName: "categorias",
      timestamps: false
    }
  );


  return Categoria;
};