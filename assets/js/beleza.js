document.addEventListener('DOMContentLoaded', function () {
    const produtos = [
        {
            id: 1,
            nome: "GreenLeaf Deodorant Cream",
            categoria: ["beleza"],
            preco: 49.59,
        },
        {
            id: 2,
            nome: "Monday Harmony Shampoo Bar",
            categoria: ["beleza"],
            preco: 89.99,
        },
        {
            id: 3,
            nome: "EcoFresh Bamboo Toothbrush",
            categoria: ["beleza"],
            preco: 35.99,
        },
        {
            id: 4,
            nome: "EarthEssence Lip Balm",
            categoria: ["beleza"],
            preco: 39.99,
        }
    ];

    // Elementos dos filtros
    const filtrosCategorias = document.querySelectorAll('.filter input[type="checkbox"]');
    const produtosDOM = document.querySelectorAll('.products-container .product');

    // Função de filtragem
    function aplicarFiltros() {
        const filtrosAtivos = {
            categorias: [],
            preco: []
        };

        // Captura quais filtros estão ativos (checados)
        filtrosCategorias.forEach(filtro => {
            if (filtro.checked) {
                if (filtro.id.startsWith("roupas") || filtro.id.startsWith("tecnologia-verde") || filtro.id.startsWith("casa") || filtro.id.startsWith("beleza")) {
                    filtrosAtivos.categorias.push(filtro.id);
                } else {
                    filtrosAtivos.preco.push(filtro.id);
                }
            }
        });

        // Percorre os produtos e decide se deve exibi-los ou não
        produtos.forEach((produto, index) => {
            const correspondeCategoria = filtrosAtivos.categorias.length === 0 || produto.categoria.some(cat => filtrosAtivos.categorias.includes(cat));
            const correspondePreco = verificarFaixaDePreco(produto.preco, filtrosAtivos.preco);

            if (correspondeCategoria && correspondePreco) {
                produtosDOM[index].style.display = 'flex'; // Exibe o produto
            } else {
                produtosDOM[index].style.display = 'none'; // Esconde o produto
            }
        });
    }

    // Verifica se o produto corresponde à faixa de preço filtrada
    function verificarFaixaDePreco(preco, filtrosDePreco) {
        if (filtrosDePreco.length === 0) return true; // Se nenhum filtro de preço estiver ativo, todos os preços são válidos

        return filtrosDePreco.some(filtro => {
            switch (filtro) {
                case "menos-200":
                    return preco < 200;
                case "200-400":
                    return preco >= 200 && preco <= 400;
                case "400-600":
                    return preco >= 400 && preco <= 600;
                case "mais-600":
                    return preco > 600;
                default:
                    return true;
            }
        });
    }

    // Adiciona o evento 'change' nos checkboxes para que o filtro seja aplicado ao marcar/desmarcar
    filtrosCategorias.forEach(filtro => {
        filtro.addEventListener('change', aplicarFiltros);
    });

    // Chama a função de filtragem para aplicar os filtros iniciais
    aplicarFiltros();
});
