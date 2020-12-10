const conexao = require('../database/sqlite');
const Sequelize = require('sequelize');

//importando model com quem quero que artigos se relacione
const Categoria = require('./CategoriaModel');

const Artigo = conexao.define('artigos',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: { //ele será util quando for pesquisar
        type: Sequelize.STRING,
        allowNull: false
    },
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
Categoria.hasMany(Artigo); //uma categoria tem muitos artigos
Artigo.belongsTo(Categoria); //um artigo pertence a categoria

//conexao.sync({force: true});

module.exports = Artigo;