
const {Produto,Categoria} = require("../../database/models")

const homeController={
    index:async(req,res)=>{

        const products = await Produto.findAll({
            include:{      
               model:Categoria,
               required: true,
               as:"categorias"
            }
        })

        const promotionalProducts = await Produto.findAll({
            where: {
                promocao: 1 
            }
            // include:{      
            //    model:Categoria,
            //    required: true,
            //    as:"categorias"
            // }
        })

        res.render('home', {products:products, promotionalProducts:promotionalProducts})
    },
    view:(req,res)=>{
        res.render('produtos/produtos',{home:produtos})
    }
}

module.exports = homeController;