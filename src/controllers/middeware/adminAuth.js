const adminAuth = (req, res, next)=>{
    //se o usuario estiver logado ele passa para a rota.
    if(req.session.user!=undefined){
        next();
    }else{
        //senao, ele nao passa
        res.redirect('/login');
    }
}
module.exports = adminAuth;