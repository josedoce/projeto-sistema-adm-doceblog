const express = require('express');
const rota = express.Router();

rota.get('/*', (req, res)=>{
    res.render('404',{
        titulo: '404 not found | doceblog'
    })
})

module.exports = rota;