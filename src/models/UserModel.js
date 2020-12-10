const Sequelize = require('sequelize');
const conexao = require('../database/sqlite');

const User = conexao.define('usuario',{
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

//User.sync({force: false}); //se a tabela não existir, crie, se existir, não crie
//se a tabela não existir, crie, se existir, não crie
module.exports = User;