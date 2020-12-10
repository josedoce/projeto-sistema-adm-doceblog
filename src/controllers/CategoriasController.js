const express = require('express');
const rota = express.Router();
const slugify = require('slugify');
const areaAdmin = require('./middeware/adminAuth');

//db
const categorias = require('../models/CategoriaModel');

rota.get('/admin/categorias/novo',areaAdmin, async(req, res)=>{
    res.render('categoria/categoriaform',{
        titulo: 'adm-criar categoria | doceblog'
    })
})
rota.post('/admin/categorias/save',areaAdmin, async(req, res)=>{
    const {titulo} = req.body;
    if(!titulo){
        return res.redirect('/admin/categorias/novo');
    }
    await categorias.create({
        titulo: titulo,
        slug: slugify(titulo)
    }).then(()=>{
        res.redirect('/admin/categorias');
    })
})
rota.get('/admin/categorias/:ok?',areaAdmin, async(req, res)=>{
    await categorias.findAll({raw: true}).then((dados)=>{
        res.render('categoria/index', {
            titulo: 'amd-listar categorias | doceblog',
            categoria: dados,
        })
    })
})
rota.delete('/admin/categoria/deletar',areaAdmin, async(req, res)=>{
    const {deletar} = req.body;
    if(deletar!=undefined){
        if(!isNaN(deletar)){
            return await categorias.destroy({where: {id: deletar}}).then(()=>{
                res.redirect('/admin/categorias/sucesso');
            }).catch(()=>{})
        }
    }
    
    return res.redirect('/admin/categorias/erro');
})
rota.put('/admin/categoria/editar',areaAdmin, async(req, res)=>{
    const {editeId, editeConteudo} = req.body;
    return await categorias.update({
        titulo: editeConteudo,
        slug: slugify(editeConteudo)
    },{
        raw: true, where: {
        id: editeId
    }}).then(()=>{
        res.redirect('/admin/categorias/sucesso');
    })
})

module.exports = rota;