const RecebeIdBotao = document.getElementById("ButtonCadastro");

function cadastrar() {
  const nome = document.getElementById("nome").value;
  const desc = document.getElementById("descricao").value;
  const preco = document.getElementById("preco").value;
  const qtd = document.getElementById("qtd").value;

  if (nome === "" || desc === "" || preco === "" || qtd === "") {
    alert("Preencha todos os campos");
  } else {
    fetch("https://diniz.dev.br/produtos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        descricao: desc,
        preco: preco,
        quantidade: qtd,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        atualizarLista();
      })
      .catch((err) => console.error("Erro ao cadastrar produto:", err));
  }
}

function atualizarLista() {
  fetch("https://diniz.dev.br/produtos/")
    .then((response) => response.json())
    .then((data) => {
      let conteudo = "";
      data.forEach((produto) => {
        conteudo += ` 
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.descricao}</td>
          <td>${"R$ " + produto.preco}</td>
          <td>${produto.quantidade}</td>
          <td>
            <button onclick="editar(${produto.id})">Editar</button>
            <button onclick="remover(${produto.id})">Excluir</button>
          </td>
        </tr>`;
      });
      document.getElementById("bodyTable").innerHTML = conteudo;
    })
    .catch((err) => console.error("Erro ao atualizar a lista:", err));
}

function editar(produtoId) {
  fetch(`https://diniz.dev.br/produtos/${produtoId}`)
    .then((response) => response.json())
    .then((produto) => {
      const novoNome = prompt("Novo Nome do Produto:", produto.nome);
      const novoPreco = prompt("Novo Preço do Produto:", produto.preco);
      const novaDescricao = prompt(
        "Nova Descrição do Produto:",
        produto.descricao
      );
      const novaQuantidade = prompt(
        "Nova quantidade de produtos:",
        produto.quantidade
      );

      if (novoNome && novoPreco && novaDescricao && novaQuantidade) {
        fetch(`https://diniz.dev.br/produtos/${produtoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: novoNome,
            preco: novoPreco,
            descricao: novaDescricao,
            quantidade: novaQuantidade,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            atualizarLista();
          })
          .catch((err) => console.error("Erro ao editar produto:", err));
      } else {
        alert("Todos os campos são obrigatórios para a edição.");
      }
    })
    .catch((err) => console.error("Erro ao buscar produto:", err));
}

function remover(produtoId) {
  if (confirm("Tem certeza que deseja remover este produto?")) {
    fetch(`https://diniz.dev.br/produtos/${produtoId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        atualizarLista();
      })
      .catch((err) => console.error("Erro ao remover produto:", err));
  }
}

document.addEventListener("DOMContentLoaded", atualizarLista);
RecebeIdBotao.addEventListener("click", function (e) {
  e.preventDefault(); // Mover para o início da função
  cadastrar();
});
