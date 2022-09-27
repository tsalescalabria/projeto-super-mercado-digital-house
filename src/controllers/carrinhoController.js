const { now } = require("moment");
const { Cliente, Compra, ProdutoCompra } = require("../../database/models");

const carrinhoController = {
  async adicionarProdutoCarrinho(req, res) {
    const { id, nome, preco, imagem } = req.body;
    const { carrinho } = req.session;
    const products = {
      id: id,
      nome,
      preco,
      imagem,
    };

    if (req.session.carrinho) {
      req.session.carrinho.push(products);
    } else {
      req.session.carrinho = [products];
    }
    res.render("carrinho", { carrinho });
  },

  async save(req, res) {
    try {
      const carrinho = req.body.carrinho;

      if (!req.session.login) {
        res.status(401).json({ erro: "Usuário não logado" });
      }
      const cliente = await Cliente.findOne({
        where: {
          email: req.session.login,
        },
      });

      const compras = await Compra.create({
        cliente_id: cliente.id,
        data: now(),
      });

      const products = carrinho.map((produto) => {
        const p = {
          produto_id: produto.id,
          compra_id: compras.id,
          quantidade: produto.quantidade,
          preco: produto.preco,
        };
        console.log("tenho => ", { produto, p });
        return p;
      });

      const resultado = await ProdutoCompra.bulkCreate(products);
      console.log(resultado, "resultado");
      return res.render("produtos/produtoListar", { products  });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = carrinhoController;
