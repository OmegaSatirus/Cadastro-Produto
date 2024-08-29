    const LP = [];

    const campoNomeProduto = document.getElementById("productName");
    const campoPrecoProduto = document.getElementById("productPrice");
    const campoCategoria = document.getElementById("categoryInput");
    const botaoCadastro = document.getElementById("botaoCadastro");
    const campoQtd = document.getElementById("qtdProduto")
    const tabela = document.getElementById("bodyTable");
    const seletorCategoria = document.getElementById("seletorCategoria");


    function addProduct() {
    let NomeProduto = campoNomeProduto.value;
    let PrecoProduto = campoPrecoProduto.value;
    let CategoriaProduto = campoCategoria.value;
    let QtdProduto = campoQtd.value;

    if (NomeProduto && PrecoProduto && CategoriaProduto) {
        const produto = {
        id: Date.now(), //Gera um id Aleatorio de acordo com a data
        Nome: NomeProduto,
        Preço: PrecoProduto,
        Categoria: CategoriaProduto,
        QTD: QtdProduto,
        };

        const produtosSalvos = JSON.parse(localStorage.getItem("ListaProdutos")) || [];
        produtosSalvos.push(produto);

        localStorage.setItem("ListaProdutos", JSON.stringify(produtosSalvos)); //stringfy = faz um array virar um string 

        LP.push(produto);
        listarProdutos();

        campoNomeProduto.value = "";
        campoPrecoProduto.value = "";
        campoQtd.value = "";
        campoCategoria.value = "";
        alert("Item adicionado com sucesso!")
        atualizarCategorias();
    } else {
        alert("Um ou mais campos estão vazios");
    }
    }

    function listarProdutos(categoriaFiltrada = "") {
    let trVazia = "";
    const produtosSalvos = JSON.parse(localStorage.getItem("ListaProdutos")) || [];

    produtosSalvos.forEach((produto) => {
        if (!categoriaFiltrada || produto.Categoria === categoriaFiltrada) {
        trVazia += `<tr>
                        <td>${produto.Nome}</td>
                        <td>${"R$ " + produto.Preço}</td>
                        <td>${produto.QTD}</td>
                        <td>${produto.Categoria}</td>
                        <td class="FlexH AlinhadoArd">
                        <button class="FlexH AlinhadoCen" onclick="editProduct(${produto.id})">Editar</button>
                        <button class="FlexH AlinhadoCen" onclick="rmvProduct(${produto.id})">Remover</button>
                        <button class="FlexH AlinhadoCen" onclick="addQtd(${produto.id})">Adicionar Itens</button>
                        <button class="FlexH AlinhadoCen" onclick="removeQtd(${produto.id})">Remover Itens</button>
                        </td>
                    </tr>`;
        }
    });

    tabela.innerHTML = trVazia;
    }

    function rmvProduct(id) {
    let produtosSalvos = JSON.parse(localStorage.getItem("ListaProdutos")) || [];

    produtosSalvos = produtosSalvos.filter(produto => produto.id !== id);

    localStorage.setItem("ListaProdutos", JSON.stringify(produtosSalvos));

    listarProdutos();
    atualizarCategorias();
    }

    function atualizarCategorias() {
    const produtosSalvos = JSON.parse(localStorage.getItem("ListaProdutos")) || [];
    const categorias = [...new Set(produtosSalvos.map(produto => produto.Categoria))];

    seletorCategoria.innerHTML = '<option value="">Todas</option>';

    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        seletorCategoria.appendChild(option);
    });
    }

    function filtrarPorCategoria() {
    const categoriaSelecionada = seletorCategoria.value;
    listarProdutos(categoriaSelecionada);
    }

    function editProduct(id) {
    const produtosSalvos = JSON.parse(localStorage.getItem("ListaProdutos")) || [];
    const produto = produtosSalvos.find(p => p.id === id); 

    if (produto) {
        const novoNome = prompt("Novo Nome do Produto:", produto.Nome);
        const novoPreco = prompt("Novo Preço do Produto:", produto.Preço);
        const novaCategoria = prompt("Nova Categoria do Produto:", produto.Categoria);
        const novaQuantidade = prompt("Nova quantidade de produtos:", produto.QTD);

        if (novoNome && novoPreco && novaCategoria) {
        const produtoAtualizado = {
            id: produto.id,
            Nome: novoNome,
            Preço: novoPreco,
            Categoria: novaCategoria,
            QTD: novaQuantidade 
        };

        const produtosAtualizados = produtosSalvos.map(p => p.id === id ? produtoAtualizado : p);
        localStorage.setItem("ListaProdutos", JSON.stringify(produtosAtualizados));

        listarProdutos();
        atualizarCategorias();
        } else {
        alert("Todos os campos são obrigatórios para a edição.");
        }
    }
    }

    function addQtd(id) {
    const produtosSalvos = JSON.parse(localStorage.getItem("ListaProdutos")) || [];
    const produto = produtosSalvos.find(p => p.id === id);
    
    if (produto) {
        const qtdAdd = parseInt(prompt("Quantos " + produto.Nome + " você deseja adicionar?"), 10);
        
        if (!isNaN(qtdAdd) && qtdAdd > 0) {
        produto.QTD = (parseInt(produto.QTD, 10) || 0) + qtdAdd;
        
        const produtosAtualizados = produtosSalvos.map(p => p.id === id ? produto : p);
        localStorage.setItem("ListaProdutos", JSON.stringify(produtosAtualizados));
        
        listarProdutos();
        atualizarCategorias();
        } else {
        alert("Quantidade inválida.");
        }
    } else {
        alert("Produto não encontrado.");
    }
    }

    function removeQtd(id) {
    const produtosSalvos = JSON.parse(localStorage.getItem("ListaProdutos")) || [];
    const produto = produtosSalvos.find(p => p.id === id);
    
    if (produto) {
        const qtdRemove = parseInt(prompt("Quantos " + produto.Nome + " você deseja remover?"), 10);
        
        if (!isNaN(qtdRemove) && qtdRemove > 0) {
        if (produto.QTD - qtdRemove < 0) {
            alert("Quantidade a ser removida é maior que a quantidade disponível.");
        } else {
            produto.QTD = (parseInt(produto.QTD, 10) || 0) - qtdRemove;
            
            const produtosAtualizados = produtosSalvos.map(p => p.id === id ? produto : p);
            localStorage.setItem("ListaProdutos", JSON.stringify(produtosAtualizados));
            
            listarProdutos();
            atualizarCategorias();
        }
        } else {
        alert("Quantidade inválida.");
        }
    } else {
        alert("Produto não encontrado.");
    }
    }



    botaoCadastro.addEventListener("click", function (e) {
    e.preventDefault();
    addProduct();
    });

    document.addEventListener("DOMContentLoaded", () => {
    listarProdutos();
    atualizarCategorias();
    });
