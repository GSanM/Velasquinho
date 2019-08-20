const axios = require('axios');
const velasquinho = require('./velasquinhoModule');
const module1 = require('./module1')
const module2 = require('./module2')
var express = require('express');
var app = express();

const url_clientes = "http://www.mocky.io/v2/598b16291100004705515ec5";
const url_compras = "http://www.mocky.io/v2/598b16861100004905515ec7";



(async () => {
    // var clients = await velasquinho.getData(url_clientes);
    var compras = await velasquinho.getData(url_compras);
    // var valores = await module1.somaValoresTotais(compras);
    // var ordenado = await module1.ordenaCompras(valores);
    console.log(module2.maiorCompraUnica2016(compras));
})();