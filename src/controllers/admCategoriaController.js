
const {Categoria, Produto} = require("../../database/models");
const admCategoriaController = {
   list: async (req,res)=>{
      if (req.session.login != 'adm@gmail.com') {
         let message = "É preciso estar logado como administrador para visualizar esta página" ;
         let type = "danger" ;
         
         res.render('users/login', {message, type})
      }
      try{
         const categorias = await Categoria.findAll()
      
         return res.render('categorias/categoriaListar',{categorias })
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

      return res.render('categorias/categoriaCadastrar',{categorias})
   },

   store:async (req,res)=>{
     
      try{
         const result= await Categoria.create({
            nome:req.body.nome,
         })

         const categorias = await Categoria.findAll()

         let message = "categoria Cadastrado com Sucesso!" ;
         let type = "success" ;
         
         return res.render('categorias/categoriaListar',{categorias, message, type})
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
         const categoria = await Categoria.findByPk(id)

         return res.render ('categorias/categoriaAtualizar',{categoria})

      } catch (error) {
         console.log(err)
      }
   },

   update:async (req,res)=>{  
     try {
      const {id} = req.params 
      const resultado= await Categoria.update({

         nome:req.body.nome,      
      },{
         
           where:{
            id_categoria:id
           }
          
      })
   
      const categorias = await Categoria.findAll()

      let message = "Categoria Atualizada com Sucesso!" ;
      let type = "success" ;
         
      return res.render('categorias/categoriaListar',{categorias, message, type})
   
     } catch (err) {
      console.log(err)
     }
     
   
   },
   destroy:async (req,res)=>{

      try {

         const {id} =req.params
         const categoria = await Categoria.findByPk(id)

         const result= await Categoria.destroy({
               where:{
               id_categoria:id
               }
         })


         const categorias = await Categoria.findAll()

         let message = "Categoria deletada com Sucesso!" ;
         let type = "success" ;
            
         return res.render('categorias/categoriaListar',{categorias, message, type})
         
         } catch (err) {
            console.log(err)
         }
      }

}
  



module.exports=admCategoriaController