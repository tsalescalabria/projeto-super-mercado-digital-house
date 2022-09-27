var express = require('express');
var router = express.Router();

const admClienteController=require('../controllers/admClienteController')
const {Cliente} = require("../../database/models");
const bcrypt = require("bcrypt");


/* GET login. */
router.get('/login', async function(req, res, next) {

  if (req.query.code == 1) {
    let message = "Faça login para continuar a compra" ;
    let type = "danger" ;
    
    return res.render('users/login', {message, type})
  }
  
  if(req.session.login){
    const cliente = await Cliente.findOne({
      where: {
        email: req.session.login,
        ativo: 1
      }
    })

    res.render('users/index', {cliente})
  }else{
    res.render('users/login')
  }

});

/* POST login. */
router.post('/login', async function(req, res, next) {

  const cliente = await Cliente.findOne({
    where: {
      email: req.body.user_email,
      ativo: 1
    }
  })
  
  const isValid = await bcrypt.compare(req.body.user_password, cliente.senha);

  if (isValid) {
    // Logado com sucesso
    req.session.login = cliente.email

    let message = "Logado com sucesso!" ;
    let type = "success" ;
    
    user = req.body.user_email;
    res.render('carrinho')
      
  }else{
    let message = "Falha ao logar, verifique se os dados estão corretos" ;
    let type = "danger" ;
    
    res.render('users/login', {message, type})
  }

});

/* GET Logout */
router.get('/logout', (req, res) => {
  if (req.session.login) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Não foi possível fazer logout: ' + err)
      } else {
           let message = "Logout realizado com sucesso!" ;
    let type = "success" ;
    
    return res.render('users/login', {message, type})
      }
    })
  }else{
       let message = "Logout realizado com sucesso!" ;
    let type = "success" ;
    
    return res.render('users/login', {message, type})
  }
})

//criar
router.get('/cadastrar',admClienteController.create)

// salvar
router.post('/cadastrar',admClienteController.store)

// Perfil
router.get('/perfil/:id',admClienteController.edit)
router.put('/alterar/:id',admClienteController.update)

// deletar
router.delete('/deletar/:id',admClienteController.destroy)

module.exports = router;
