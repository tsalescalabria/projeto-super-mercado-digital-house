const db = require('../../database/models')

const productController = {
    index: async (req,res)=>{
       try{
        const {slug} = req.params;
           const product = await db.Produto.findOne({
               where:{
                slug
               }
           })
           console.log(product);
           res.render('internalProduct', {product});
       }
       catch(err){
           console.log(err);
       }
   
 
 },
}

   
    
module.exports=productController;