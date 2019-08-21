const axios = require('axios'); //Para requests

module.exports = {

    //Substitui "." (idx = 11) por "-"
    replaceDot: function(str) {
        str = str.substr(0, 11) + '-' + str.substr(11 + 1);

        return str;
    },

    //Normaliza CPFs com um 0 a mais na frente e substitui ultimo "." por "-"
    arrumaCPF: function(dados) {
        
        for(var i = 0; i < dados.length; ++i)
        {   
            cpf = dados[i].cliente;

            if(cpf.length > 14)
            {
                cpf = cpf.substring(1);
            }
            dados[i].cliente = this.replaceDot(cpf);
        }
        
        return dados;
    },

    //Usa axios para mandar uma requisição http na URL e retornar a resposta
    getData: async function(url) {
        try {
            const response = await axios.get(url);
            const data = response.data;
            return data;

        } catch (error) {
            console.log(error);
        }
    },

    nomeByCPF: function(clientes, cpf)
    {
        for(var i = 0; i < clientes.length; ++i)
        {
            if(clientes[i].cpf == cpf)
                return clientes[i].nome;
        }
        console.log("CPF não encontrado");
        
        return -1;
    },

    CPFByNome: function(clientes, nome)
    {
        for(var i = 0; i < clientes.length; ++i)
        {
            if(clientes[i].nome == nome)
                return clientes[i].cpf;
        }
        console.log("Nome não encontrado");
        
        return -1;
    }
}