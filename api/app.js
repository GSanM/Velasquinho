const module1 = require('./module1'); //Referente a tarefa #1
const module2 = require('./module2'); //Referente a tarefa #2
const module3 = require('./module3'); //Referente a tarefa #3
const module4 = require('./module4'); //Referente a tarefa #4
const velasquinho = require('./velasquinhoModule'); //Funções gerais

const path = require('path');
var express = require('express');
var app = express();

const url_clientes = "http://www.mocky.io/v2/598b16291100004705515ec5";
const url_compras = "http://www.mocky.io/v2/598b16861100004905515ec7";

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//Compras dos clientes
app.get('/compras', async function(req, res) {
    var clientes = await velasquinho.getData(url_clientes);
    var compras = await velasquinho.arrumaCPF(await velasquinho.getData(url_compras));
    var valores = await module1.somaValoresTotais(compras);
    var ordenado = await module1.ordenaCompras(valores, clientes);
    res.send(ordenado);
});

//Maior compra de cada ano (2014, 2015, 2016)
app.get('/maior_compra/:ano', async function(req, res) {
    var clientes = await velasquinho.getData(url_clientes);
    var compras = await velasquinho.arrumaCPF(await velasquinho.getData(url_compras));
    var maiorCompra = await module2.maiorCompraUnica(compras, req.params.ano, clientes);
    res.send(maiorCompra);
});

//Retorna a lista de clientes e o nível de fidelidade 
//Parametro opcional: tamanho do ranking de clientes fieis
app.get('/clientes_fieis:top?', async function(req, res) {
    var clientes = await velasquinho.getData(url_clientes);
    var compras = await velasquinho.arrumaCPF(await velasquinho.getData(url_compras));
    var fieis = await module3.clientesFieis(compras, clientes, req.params.top);
    res.send(fieis);
});

app.get('/recomendacao/:cliente/:tipo?', async function(req, res) {
    var clientes = await velasquinho.getData(url_clientes);
    var compras = await velasquinho.arrumaCPF(await velasquinho.getData(url_compras));
    var sisRec = await module4.sistemaRecomendacao(compras);
    var recomendado = await module4.recomendaVinho(sisRec, req.params.cliente, clientes, compras, req.params.tipo);
    res.send("Baseado no seu gosto em vinhos recomendamos: " + recomendado);
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

//=================================================
// (async () => {
//     var clientes = await velasquinho.getData(url_clientes);
//     var compras = await velasquinho.arrumaCPF(await velasquinho.getData(url_compras));
//     var valores = await module1.somaValoresTotais(compras);
//     var ordenado = await module1.ordenaCompras(valores, clientes);
//     var maiorCompra = await module2.maiorCompraUnica2016(compras);
//     var fieis = await module3.clientesFieis(compras);
//     var sisRec = await module4.sistemaRecomendacao(compras);
//     var recomendado = await module4.recomendaVinho(sisRec, "Jonathan", clientes);
//     console.log(ordenado);
// })();
//================================================