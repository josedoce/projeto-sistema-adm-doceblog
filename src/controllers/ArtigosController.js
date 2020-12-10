const express = require('express');
const rota = express.Router();
const artigos = require('../models/ArtigoModel');
const categorias = require('../models/CategoriaModel');
const slugify = require('slugify');
const areaAdmin = require('./middeware/adminAuth');

rota.get('/admin/artigos/:idConteItens?',areaAdmin, async(req, res)=>{
    const {idConteItens} = req.params;
    let total = {};
    if(!idConteItens){
        return await artigos.findAll({raw: true}).then(async(dadosArtigos)=>{
            res.render('artigos/index', {
                titulo: 'admin-artigos | doceblog',
                artigos: dadosArtigos,
                numeros: '',
                cate: {
                    titulo: 'Todas as categorias'
                }
            })
        })
    }
    return await artigos.findAll({raw: true, where: {categoriaId: idConteItens}}).then(async(dadosArtigos)=>{
        if(dadosArtigos[0] === undefined){
            dadosArtigos = [{
                id: 'null',
            }]
        }
        total = await artigos.findAndCountAll({raw: true, where: { categoriaId: idConteItens}});
        
        const caTitulo = await categorias.findOne({raw: true, where: {id: idConteItens}});
        
        res.render('artigos/index', {
            titulo: 'admin-artigos | doceblog',
            artigos: dadosArtigos,
            numeros: total.count,
            cate: caTitulo
        })
    })
})
rota.get('/admin/artigo/novo/:idErro?',areaAdmin, async(req, res)=>{
    const {idErro} = req.params;
    await categorias.findAll({raw: true}).then((selectCategorias)=>{
        res.render('artigos/artigos', {
            titulo: 'admin-criar artigos | doceblog',
            cat: selectCategorias,
            erro: idErro
        })
    })
})
rota.post('/admin/artigo/save',areaAdmin, async(req, res)=>{
    const { titulo, body, categoriaArtigo } = req.body;
    const go = (a) => {res.redirect(`/admin/artigos/novo/${a}`)};
    if((!titulo) && (!body) && (!categoriaArtigo)){return go(0)};
    if(!titulo){return go(1)};
    if(!body){return go(2)};
    if(!categoriaArtigo){return go(3)};
    await artigos.create({
        titulo: titulo,
        slug: slugify(titulo),
        corpo: body,
        categoriaId: categoriaArtigo
    }).then(()=>{
        res.redirect('/admin/artigo/novo/4');
    })
});
rota.get('/admin/artigo/texto/:idEditar/:conf?',areaAdmin, async(req, res)=>{
    const {idEditar, conf} = req.params;
    await categorias.findAll({raw: true}).then(async(selectCategorias)=>{
        await artigos.findOne({raw: true, where: {id: idEditar}}).then((artigos)=>{
            res.render('artigos/textarea', {
                titulo: 'admin-editar artigos | doceblog',
                artigo: artigos,
                cat: selectCategorias,
                erro: conf
            })
        })
    })
})
rota.put('/admin/artigo/edite',areaAdmin, async(req, res)=>{
    const {titulo, body, categoriaArtigo, id} = req.body;
    await artigos.update({
        titulo: titulo,
        corpo: body,
        slug: slugify(titulo),
        categoriaId: categoriaArtigo
    },{raw: true, where: {id: id}}).then((dados)=>{
        console.log(dados)
        res.redirect(`/admin/artigo/texto/${id}/0`);
    })
})
rota.delete('/admin/artigo/deletar',areaAdmin, async(req, res)=>{
    const {deletar} = req.body;
    await artigos.destroy({raw: true, where: {id: deletar}}).then(()=>{
        res.redirect('/admin/artigos')
    })
})

module.exports = rota;