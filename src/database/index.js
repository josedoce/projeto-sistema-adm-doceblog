const Sequelize = require('sequelize');

const conexao = new Sequelize('blog_com_gerenciamento', 'root', 'gatomolhado',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

conexao
    .authenticate()
    .then(()=>{
        console.log('Conexão estabelecida com sucesso!');
    })
    .catch((error)=>{
        console.log('Erro ao se conectar ao banco de dados!');
    })
module.exports = conexao;