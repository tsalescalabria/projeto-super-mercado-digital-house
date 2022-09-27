
const {Produto,Categoria} = require("../../database/models");
const admProdutoController = {
   list: async (req,res)=>{
      if (req.session.login != 'adm@gmail.com') {
         let message = "É preciso estar logado como administrador para visualizar esta página" ;
         let type = "danger" ;
         
         res.render('users/login', {message, type})
      }
      try{
         const produtos = await Produto.findAll({
            include:{      
               model:Categoria,
               required: true,
               as:"categorias"
            }
         })
      
         return res.render('produtos/produtoListar',{produtos, })
      }
      catch(err){
         console.log(err)
      }
   },

   create:async(req,res)=>{

      if (req.session.login != 'adm@gmail.com') {
         let message = "É preciso estar logado como administrador para visualizar esta página" ;
         let type = "danger" ;
         
         res.render('users/login', {message, type})
      }

      const categorias = await Categoria.findAll();

      return res.render('produtos/produtoCadastrar',{categorias})
   },

   store:async (req,res)=>{

      function slugify(str)
      {
         str = str.replace(/^\s+|\s+$/g, '');

         // Make the string lowercase
         str = str.toLowerCase();

         // Remove accents, swap ñ for n, etc
         var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
         var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
         for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
         }

         // Remove invalid chars
         str = str.replace(/[^a-z0-9 -]/g, '') 
         // Collapse whitespace and replace by -
         .replace(/\s+/g, '-') 
         // Collapse dashes
         .replace(/-+/g, '-'); 

         return str;
      }

      $slug = slugify(req.body.nome);

      try{
         const result= await Produto.create({
            nome:req.body.nome,
            slug:$slug,
            preco:req.body.preco,
            fk_categoria:req.body.categoria,
            quantidade:0,
            descricao:req.body.descricao,
            imagem: req.body.imagem,
         })

         const produtos = await Produto.findAll({
            include:{      
               model:Categoria,
               required: true,
               as:"categorias"
            }
         })

         let message = "Produto Cadastrado com Sucesso!" ;
         let type = "success" ;
         
         return res.render('produtos/produtoListar',{produtos, message, type})
      }
      catch(err){
         console.log(err)
      }
   },

   edit:async (req,res)=>{

      if (req.session.login != 'adm@gmail.com') {
         let message = "É preciso estar logado como administrador para visualizar esta página" ;
         let type = "danger" ;
         
         res.render('users/login', {message, type})
      }

      try {
         const {id} = req.params
         const produto = await Produto.findByPk(id)

         const categorias = await Categoria.findAll();

         return res.render ('produtos/produtoAtualizar',{produto, categorias})

      } catch (error) {
         console.log(err)
      }
   },

   update:async (req,res)=>{  
     try {
      const {id} = req.params 
      const resultado= await Produto.update({

         nome:req.body.nome,
         slug:req.body.slug,
         preco:req.body.preco,
         fk_categoria:req.body.categoria,
         quantidade:req.body.quantidade,
         descricao:req.body.descricao
      
      },{
         
           where:{
            id_produto:id
           }
          
      })
   
      const produtos = await Produto.findAll({
         include:{      
            model:Categoria,
            required: true,
            as:"categorias"
         }
      })

      let message = "Produto Atualizado com Sucesso!" ;
      let type = "success" ;
         
      return res.render('produtos/produtoListar',{produtos, message, type})
   
     } catch (err) {
      console.log(err)
     }
     
   
   },
   destroy:async (req,res)=>{

      try {

         const {id} =req.params
         const produto = await Produto.findByPk(id)

         const result= await Produto.destroy({
               where:{
               id_produto:id
               }
         })

         const produtos = await Produto.findAll({
            include:{      
               model:Categoria,
               required: true,
               as:"categorias"
            }
         })

         let message = "Produto " + produto.nome + " deletado com Sucesso!" ;
         let type = "success" ;
            
         return res.render('produtos/produtoListar',{produtos, message, type})
         
      } catch (err) {
         console.log(err)
      }
      }

}
  



module.exports=admProdutoController