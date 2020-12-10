const Sequelize = require('sequelize');
const path = require('path');

const conexao = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'sqlite/db.sqlite'),
});

// conexao.sync({force: true});
conexao
    .authenticate()
    .then(()=>{
        console.log('Conexão estabelecida com sucesso!');
    })
    .catch((error)=>{
        console.log('Erro ao se conectar ao banco de dados!');
    })
module.exports = conexao;