const express = require('express');
const rota = express.Router();
const user = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const areaAdmin = require('./middeware/adminAuth');

rota.get('/adm/usuarios',areaAdmin, async(req, res)=>{
    const dados = await user.findAll({raw: true});
    res.render('usuario/index',{
        titulo: 'usuarios | doceblog',
        usuarios: dados
    })
})
rota.delete('/adm/delete/usuario',areaAdmin, async(req, res)=>{
    const {idusuario} = req.body;
    await user.destroy({where: {id: idusuario}}).then(()=>{
        res.redirect('/adm/usuarios');
    })
})
rota.get('/login/:erro?', async(req, res)=>{
    const{erro} = req.params;
    res.render('usuario/login',{
        titulo: 'login | doceblog',
        erro: erro
    })
})
rota.post('/autenticacao', async(req, res)=>{
    const {email, senha, lembre} = req.body;
    if(email=='' || senha ==''){
        return res.redirect('/login/1');
    }
    const dados = await user.findOne({where: {email: email}});
    if(dados==null){
        return res.redirect('/login/0');
    }
    const comparacao = bcrypt.compareSync(senha, dados.senha);
    
    if(!comparacao){return res.redirect('/login/0');}
    //caso tudo esteja nos conformes
    req.session.user = {
        id: dados.id,
        email: dados.email
    }

    return res.redirect('/');
})
rota.get('/registro/:erro?', async(req, res)=>{
    const {erro} = req.params;
    
    res.render('usuario/registro',{
        titulo: 'registro | doceblog',
        erro: erro
    })
})
rota.post('/registro/save', async(req, res)=>{
    const {email, senha} = req.body;

    if(email=='' || senha ==''){
        return res.redirect('/registro/1');
    }
    //barreira de email duplicado
    const dados = await user.findOne({
        raw: true,
        where: {email: email}
    })
    if(dados != null){
        return res.redirect('/registro/0');
    }

    //salt é um tempero a mais para a segurança
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    await user.create({
        email: email,
        senha: hash    
    }).then(()=>{
        return res.redirect('/');
    })

})
rota.get('/logout', async(req, res)=>{
    req.session.user = undefined;
    res.redirect('/');
})

module.exports = rota;