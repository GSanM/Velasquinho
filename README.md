# Velasquinho
Prova técnica Ubots

### Installing

A aplicação é baseada em NodeJS, assim, para instalar o ambiente é necessário o comando:

```
npm install
```

Para rodar o servidor que receberá as requisições:

```
node api/app.js
```
### Endpoints disponíveis:
* /compras - Compras ordenadas por valor
* /maior_compra/ano - (Exemplo: /maior_compra/2016) - Maior compra do ano de 2016 com dados da mesma
* /clientes_fieis - Top 3 clientes mais fiéis - (Opcional: /clientes_fieis5 - top 5 clientes mais fieis)
* /recomendacao/cliente - (Exemplo: /recomendacao/Vinicius) - Uma recomendação de vinho baseado no vinho mais comprado pelo cliente
