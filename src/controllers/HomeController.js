const express = require('express');
const rota = express.Router();
const categorias = require('../models/CategoriaModel');
const artigos = require('../models/ArtigoModel');

rota.get('/', async(req, res)=>{
    let userlogado = false;
    if(req.session.user!=undefined){
        userlogado = true;
    }
    dados = await artigos.findAll({
        limit: 4,
        order: [['id','DESC']],
        raw: true,
        nest: true, //tras todos os objetos
        include: [{model: categorias}]
    })
    
    const cat = await categorias.findAll({raw: true});
    res.render('index', {
        titulo: 'home | doceblog',
        cat: cat,
        conteudo: dados,
        logado: userlogado
    })
})
rota.get('/pages/:page?', async(req, res)=>{
    let userlogado = false;
    if(req.session.user!=undefined){
        userlogado = true;
    }
    //há um erro aqui para ser resolvido
    const {page} = req.params;
    let offset = 0;
    let dados = [];
    if(isNaN(page)||page==1){
        offset = 0;
    }else{
        offset = (parseInt(page)-1) * 4;
    }
    dados = await artigos.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [['id','DESC']],
        raw: true,
        nest: true, //tras todos os objetos
        include: [{model: categorias}]
    })
    let proximo;
    if(offset + 4 >= dados.count){
        proximo = false;
    }else{
        proximo = true;
    }
    const cat = await categorias.findAll({raw: true});
    res.render('pages/pages', {
        titulo: 'paginas | doceblog',
        cat: cat,
        conteudo: dados.rows,
        logado: userlogado,
        paginador: {
            next: proximo,
            pages: Math.ceil(dados.count / 4),
            atual: parseInt(page)
        }
    })
})
rota.get('/categoria/:categoriaId?', async(req, res)=>{
    let {categoriaId} = req.params;
    let dados = [];

    dados = await artigos.findAll({
        order: [['id','DESC']],
        raw: true,
        nest: true, //tras todos os objetos
        include: [{model: categorias}]
    })
    if(categoriaId!=undefined){
        dados = await artigos.findAll({
            order: [['id','DESC']],
            where:{categoriaId},
            raw: true,
            nest: true, //tras todos os objetos
            include: [{model: categorias}]
        })
    }
    const cat = await categorias.findAll({raw: true});
    res.render('index', {
        titulo: 'show | doceblog',
        cat: cat,
        conteudo: dados
    })
})
rota.get('/ler/:pesquisar', async(req, res)=>{
    const {pesquisar} = req.params;
    console.log(req.params)
    await artigos.findOne({
        raw: true,
        where: {
            slug: pesquisar
        }
    }).then((dados)=>{
        
        res.render('artigos/verArtigo', {
            titulo: dados.titulo+' | doceblog',
            conteudo: dados
        })
    })
})
module.exports = rota;