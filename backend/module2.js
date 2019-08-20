module.exports = {

    //Retorna um dict da melhor compra unica do ano 2016 no formato:
    //{cliente, valor, data}
    maiorCompraUnica2016: function(compras)
    {
        var cliente;
        var valor;
        var maior = 0;
        var data;

        for(var i = 0; i < compras.length; ++i)
        {
            if(compras[i].data.split('-')[2] == 2016)
            {
                if(compras[i].valorTotal > maior)
                {
                    cliente = compras[i].cliente;
                    valor = compras[i].valorTotal;
                    data = compras[i].data;
                    maior = valor;
                }
            }
        }

        const melhor = {cliente: cliente, valor: valor, data: data};

        return melhor;
    }
}