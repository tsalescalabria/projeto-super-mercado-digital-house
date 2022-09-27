
function adicionar(novoItem) {
  // console.log('Item novoItem:', { novoItem });
  const carrinho = localStorage.getItem('carrinho')
    ? JSON.parse(localStorage.getItem('carrinho'))
    : [];

  console.log(carrinho.find((p) => p?.id == novoItem.id));

  if (carrinho.find((p) => p?.id == novoItem.id)) {
    // console.log('achou...', novoItem.quantidade);
    novoItem.quantidade += carrinho.find(
      (p) => p?.id === novoItem.id
    ).quantidade;
  }
  const copia = [novoItem, ...carrinho.filter((p) => p?.id !== novoItem.id)];

  localStorage.setItem('carrinho', JSON.stringify(copia));

}


function remover(itemCarrinho) {
  //Montar o carrinho a partir do cookie ou do localStorage
  const carrinho = localStorage.getItem('carrinho')
    ? JSON.parse(localStorage.getItem('carrinho'))
    : [];

  // Alterar a quantidade
  const produtoNoCarrinho = carrinho.find((p) => p.id === itemCarrinho.id);
  if (produtoNoCarrinho) {
    //Alterar a quantidade1
    produtoNoCarrinho.quantidade = produtoNoCarrinho.quantidade - 1;
    //const copia =  {...produtoNoCarrinho}
  }
  //Remover o produto do array carrinho
  const copiaCarrinho = carrinho.filter((produto) => produto.quantidade >= 1);

  //Atualizar o cookie ou do localStorage com o novo carrinho
  localStorage.setItem('carrinho', JSON.stringify(copiaCarrinho));

  console.log(JSON.stringify(carrinho));
  exibirCarrinho();
}

function exibirCarrinho() {
  const carrinhoTela = document.getElementById('carrinho-container');

  const carrinho = localStorage.getItem('carrinho')
    ? JSON.parse(localStorage.getItem('carrinho'))
    : [];

  //Apagar o carrinho carrinhoTela
  carrinhoTela.innerHTML = '';
  carrinho.forEach((produto) => {
    carrinhoTela.innerHTML += `  
      <div class="card col-4"><div class='produto'>                                
            <img class="img-fluid" src='${produto.imagem}' />
        <p>
            Nome: ${produto.nome}
        </p>
        <p>
            Valor: R$ ${produto.preco}
        </p>
        <p>
            Quantidade: ${produto.quantidade}
        </p>
        <p>
            Subtotal: R$ ${
              produto.quantidade * produto.preco
            }
        </p>
        <p>
            <button class="btn-carrinho btn btn-danger" onclick="remover({id:'${produto.id}', nome:'${produto.nome}'})">Remover </button>
        </p></div></div>`;
  });

  if (!carrinho.length) {
    carrinhoTela.innerHTML += `  
    <div class="container text-center mt-5 mx-auto">
    <h1 class="carrinho">Meu Carrinho</h1>
    <h1 class="carrinho1">Seu Carrinho está vazio.</h1>
    <span class="text">Para continuar comprando, navegue pelas categorias do site ou faça uma busca pelo seu produto.</span>
    <div class="bloco">
    <button class="botao-r"><a class="ln" href='/produtos'>Escolher Produtos</a></button>
    </div></div>
  `
  }
}
