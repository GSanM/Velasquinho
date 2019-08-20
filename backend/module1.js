module.exports = {

    //Soma valor de compras de cada cliente
    somaValoresTotais: function(compras) {
        
        var clientes = [];

        //Adiciona clientes das compras no array
        for(var i = 0; i < compras.length; ++i)
        {   
            clientes.push(compras[i].cliente);
        }

        //Cria um array de todos os clientes
        const clientesDistintos = [...new Set(clientes)].sort();

        var valores = {};
        //Cria um dicionario com o CPF dos clientes como key 
        //e o valor de compra (iniciado em zero) como value
        clientesDistintos.forEach(element => {
            valores[element] = 0;
        });
        
        //Soma uma compra no CPF do cliente
        for(var i = 0; i < compras.length; ++i)
        {
            valores[compras[i].cliente] += compras[i].valorTotal;
        }

        return valores;
    },

    //Comparador para ordenar vetor
    comparador: function(a, b) {

        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
    },

    //Retorna clientes ordenados pelo valor de compra
    ordenaCompras: function(valores) {
        var arr;
        var clientes_ordenados = {};

        //Converte em array para ordenar
        arr = Object.entries(valores).sort(this.comparador);

        //Converte novamente em dict para mante padrão key: value
        for(var i = 0; i < arr.length; ++i)
        {
            clientes_ordenados[arr[i][0]] = arr[i][1];
        }

        return clientes_ordenados;
    }
}