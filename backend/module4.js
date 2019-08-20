const module1 = require('./module1'); //Para o comparador

module.exports = {
    
    //Cria um "sistema" de recomendacao com os dados dos vinhos, variedades, paises e categorias a partir das
    //compras dos clientes
    sistemaRecomendacao: function(compras)
    {
        var clientes = []
        //Adiciona clientes das compras no array
        for(var i = 0; i < compras.length; ++i)
        {   
            clientes.push(compras[i].cliente);
        }

        //Cria um array de todos os clientes
        const clientesDistintos = [...new Set(clientes)].sort();

        var reco = {};
        //Cria um dicionario com o CPF dos clientes como key 
        //e a recomendacao
        clientesDistintos.forEach(element => {
            reco[element] = {vinhos: [], variedade: [], pais: [], categoria: []};
        });

        //Cria uma seleção de vinhos comprados por cliente
        for(var i = 0; i < compras.length; ++i)
        {
            for(var j = 0; j < compras[i].itens.length; ++j)
            {
                reco[compras[i].cliente].vinhos.push(compras[i].itens[j].produto);
                reco[compras[i].cliente].variedade.push(compras[i].itens[j].variedade);
                reco[compras[i].cliente].pais.push(compras[i].itens[j].pais);
                reco[compras[i].cliente].categoria.push(compras[i].itens[j].categoria);
            }     
        }

        //Cria estrutura da recomendacao
        var counts = {};
        clientesDistintos.forEach(element => {
            counts[element] = {vinhos: {}, variedade: {}, pais: {}, categoria: {}};
        });

        //Alimenta quantidade de vinhos comprados por cliente
        for(var i = 0; i < Object.keys(reco).length; ++i)
        {
            for(var j = 0; j < reco[clientesDistintos[i]].vinhos.length; ++j)
            {
                counts[clientesDistintos[i]].vinhos[reco[clientesDistintos[i]].vinhos[j]] = 1 + (counts[clientesDistintos[i]].vinhos[reco[clientesDistintos[i]].vinhos[j]] || 0);
            }
        }
        
        //Alimenta quantidade de variedades de vinhos compradas por cliente
        for(var i = 0; i < Object.keys(reco).length; ++i)
        {
            for(var j = 0; j < reco[clientesDistintos[i]].variedade.length; ++j)
            {
                counts[clientesDistintos[i]].variedade[reco[clientesDistintos[i]].variedade[j]] = 1 + (counts[clientesDistintos[i]].variedade[reco[clientesDistintos[i]].variedade[j]] || 0);
            }
        }
        
        //Alimenta quantidade de paises dos vinhos compradas por cliente
        for(var i = 0; i < Object.keys(reco).length; ++i)
        {
            for(var j = 0; j < reco[clientesDistintos[i]].pais.length; ++j)
            {
                counts[clientesDistintos[i]].pais[reco[clientesDistintos[i]].pais[j]] = 1 + (counts[clientesDistintos[i]].pais[reco[clientesDistintos[i]].pais[j]] || 0);
            }
        }

        //Alimenta quantidade de categorias dos vinhos compradas por cliente
        for(var i = 0; i < Object.keys(reco).length; ++i)
        {
            for(var j = 0; j < reco[clientesDistintos[i]].categoria.length; ++j)
            {
                counts[clientesDistintos[i]].categoria[reco[clientesDistintos[i]].categoria[j]] = 1 + (counts[clientesDistintos[i]].categoria[reco[clientesDistintos[i]].categoria[j]] || 0);
            }
        }
        
        return counts;
    },

    recomendaVinho: function(sisRec, cliente)
    {
        //Vinho mais comprado pelo cliente
        const vinho = Object.entries(sisRec[cliente].vinhos).sort(module1.comparador)[0][0];
        
        //Variedade mais comprada pelo cliente
        const variedade = Object.entries(sisRec[cliente].variedade).sort(module1.comparador)[0][0];

        //Pais de origem preferido do cliente
        const pais = Object.entries(sisRec[cliente].pais).sort(module1.comparador)[0][0];

        //Categoria de vinho mais comprada pelo cliente
        const categoria = Object.entries(sisRec[cliente].categoria).sort(module1.comparador)[0][0];

        //Em caso de empate (para todos acima) escolhe o primeiro 

        return vinho;
    }
}