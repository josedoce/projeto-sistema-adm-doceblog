const conexao = require('../database/sqlite');
const Sequelize = require('sequelize');

const Categoria = conexao.define('categorias',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: { //ele será util quando for pesquisar
        type: Sequelize.STRING,
        allowNull: false
    }
});

//conexao.sync({force: true});

module.exports = Categoria;