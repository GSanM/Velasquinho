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
* /recomendacao/cliente/tipo - (Exemplo: /recomendacao/Vinicius/variedade) - Uma recomendação de vinho baseado nos tipos de vinho que o cliente mais compra.

Caso o cliente tenha comprado mais vinhos brasileiros, o endpoint /recomendacao/<nome_do_cliente>/pais irá retornar um random entre todos os vinhos brasileiros já comprados na loja. (E assim para todos os países)

Caso o cliente tenha comprado mais vinhos Merlot, o endpoint /recomendacao/<nome_do_cliente>/variedade irá retornar um random entre todos os vinhos Merlot já comprados na loja. (E assim para todas as variedades)

Caso o cliente tenha comprado mais vinhos Tinto, o endpoint /recomendacao/<nome_do_cliente>/categoria irá retornar um random entre todos os vinhos tintos já comprados na loja. (E assim para todas as categorias)

O parâmetro tipo é opcional, caso nenhum seja inserido, o vinho mais comprado pelo cliente será indicado.
