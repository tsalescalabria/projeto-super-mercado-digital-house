var express = require('express');
var router = express.Router();
const homeController= require('../controllers/homeController');
const productsController= require('../controllers/productsController');
const productController= require('../controllers/productController');
const finalizacaoController= require('../controllers/finalizacaoController');
const clienteController= require('../controllers/clienteController');
const admProdutoController=require('../controllers/admProdutoController');
const admCategoriaController=require('../controllers/admCategoriaController');
const carrinhoController=require('../controllers/carrinhoController');

/* GET home page. */
router.get('/',homeController.index)

router.get('/sucesso', function(req, res) {
    res.render('sucesso');
});


/* GET products page. */
router.get('/produtos', productsController.index)

/* GET internal product page. */
router.get('/produto/:slug', productController.index)

/* GET finalização  page. */
router.get('/finalizacao', finalizacaoController.index)


/* GET clientes lista */
router.get('/clientes/lista', clienteController.listar)

// crud -sequelize admProduto 


//listar
router.get('/lista/produtos',admProdutoController.list)

//criar
router.get('/cadastrar',admProdutoController.create)

//salvar
router.post('/cadastrar',admProdutoController.store)

//alterar
router.get('/alterar/:id',admProdutoController.edit)
router.put('/alterar/:id',admProdutoController.update)

//deletar
router.delete('/deletar/:id',admProdutoController.destroy)


// Categorias
//listar
router.get('/lista/categorias',admCategoriaController.list)

//criar
router.get('/categoria/cadastrar',admCategoriaController.create)

//salvar
router.post('/categoria/cadastrar',admCategoriaController.store)

//alterar
router.get('/categoria/alterar/:id',admCategoriaController.edit)
router.put('/categoria/alterar/:id',admCategoriaController.update)

//deletar
router.delete('/categoria/deletar/:id',admCategoriaController.destroy)

// Salvar Compra

router.post('/api/carrinho/comprar', carrinhoController.save);

router.post('/api/carrinho/comprar', (req, res) => {
    const retorno = req.body;
    console.log('CHEGUEI: ',  req.body);
    return res.json("retorno api = "+retorno);
})


module.exports = router;