const axios = require('axios');

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
            const corrected = await this.arrumaCPF(data);
            return corrected;

        } catch (error) {
            console.log(error);
        }
    }
}