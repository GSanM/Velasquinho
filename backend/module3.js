const module1 = require('./module1'); //Para o comparador

module.exports = {

    calculaFidelidade: function(compras)
    {
        var clientes = []
        //Adiciona clientes das compras no array
        for(var i = 0; i < compras.length; ++i)
        {   
            clientes.push(compras[i].cliente);
        }

        //Cria um array de todos os clientes
        const clientesDistintos = [...new Set(clientes)].sort();

        var fidelidade = {};
        //Cria um dicionario com o CPF dos clientes como key 
        //e a fidelidade dos mesmos em cada ano
        clientesDistintos.forEach(element => {
            fidelidade[element] = {2014: 0, 2015: 0, 2016: 0, nivel: 0, datas: []};
        });

        //Contabiliza visitas dos clientes por ano
        for(var i = 0; i < compras.length; ++i)
        {
            fidelidade[compras[i].cliente].nivel += 1;
            fidelidade[compras[i].cliente][compras[i].data.split('-')[2]] += 1;
            fidelidade[compras[i].cliente].datas.push(compras[i].data);
        }

        return fidelidade;
    },

    clientesFieis: function(compras)
    {   
        var arr;
        var clientes_fieis = {};
        var clientes_fieis_ordenados = {};
        var fidelidade = calculaFidelidade(compras);

        //Cria dict padrão {cliente, nível}
        for(var i = 0; i < compras.length; ++i)
        {
            clientes_fieis[compras[i].cliente] = fidelidade[compras[i].cliente].nivel;
        }

        //Converte em array para ordenar
        arr = Object.entries(clientes_fieis).sort(module1.comparador);

        //Converte novamente em dict para mante padrão key: value
        for(var i = 0; i < arr.length; ++i)
        {
            clientes_fieis_ordenados[arr[i][0]] = arr[i][1];
        }
        
        return clientes_ordenados;
    }
}