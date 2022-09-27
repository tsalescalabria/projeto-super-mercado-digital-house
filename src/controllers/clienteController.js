const db = require('../../database/models')

const clienteController={

    listar: async (req,res)=>{
        const clientes = await db.Cliente.findAll();
        res.render('cliente/listar', {clientes})
    }
}

module.exports = clienteController;