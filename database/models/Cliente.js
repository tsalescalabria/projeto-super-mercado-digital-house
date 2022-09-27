module.exports = (sequelize, dataTypes) => {
  let alias = 'Cliente';
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    // created_at: dataTypes.TIMESTAMP,
    // updated_at: dataTypes.TIMESTAMP,
    nome: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(15),
      allowNull: false
    },
    senha: {
      type: dataTypes.STRING(15),
      allowNull: false
    },
    estado: {
      type: dataTypes.STRING(150),
      allowNull: false
    },
    cidade: {
      type: dataTypes.STRING(150),
      allowNull: false
    },
    endereco: {
      type: dataTypes.STRING(150),
      allowNull: false
    },
    telefone: {
      type: dataTypes.STRING(150),
      allowNull: false
    },
    ativo: {
      type: dataTypes.BOOLEAN,
      allowNull: false
    }
  };
  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  };

  const Cliente = sequelize.define(alias, cols, config);
  
  Cliente.associate=(models)=>{
  Cliente.hasMany(models.Compra,{
    foreignKey: 'compra_id',
    as:'compras'
})
  }

  return Cliente;
};