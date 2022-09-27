const {Produto,Categoria} = require("../../database/models")

const productsController={

    index:async(req,res)=>{
        const products = await Produto.findAll({
            include:{      
               model:Categoria,
               required: true,
               as:"categorias"
            }
        })
        console.log("alguma coisa" ,products)
        res.render('products', {products:products})
        
    }
}


module.exports=productsController;