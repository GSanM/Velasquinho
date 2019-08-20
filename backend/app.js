const axios = require('axios');
var express = require('express');
var app = express();

const url_clients = "http://www.mocky.io/v2/598b16291100004705515ec5";
const url_buys = "http://www.mocky.io/v2/598b16861100004905515ec7";

//Substitui "." (idx = 11) por "-"
function replaceDot(str)
{
    str = str.substr(0, 11) + '-' + str.substr(11 + 1);

    return str;
};

//Normaliza CPFs com um 0 a mais na frente e substitui ultimo "." por "-"
async function arrumaCPF(dados) {
    
    for(var i = 0; i < dados.length; ++i)
    {   
        cpf = dados[i].cliente;

        if(cpf.length > 14)
        {
            cpf = cpf.substring(1);
        }
        dados[i].cliente = replaceDot(cpf);
    }
    
    return dados;
};

//Usa axios para mandar uma requisição http na URL e retornar a resposta
const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const corrected = await arrumaCPF(data);
    return corrected;

  } catch (error) {
    console.log(error);
  }
};

async function somaValorTotal(compras) {
    
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
};

(async () => {
    // var clients = await getData(url_clients);
    var compras = await getData(url_buys);
    await somaValorTotal(compras);
})();

// app.get('', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });