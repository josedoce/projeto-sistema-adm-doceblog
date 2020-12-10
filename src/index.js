const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

//controllers
const categoriasController = require('./controllers/CategoriasController');
const homeController = require('./controllers/HomeController');
const notFoundController = require('./controllers/NotFoundController');
const artigosController = require('./controllers/ArtigosController');
const loginController = require('./controllers/UserController');


//INICIALIZADOR 
const app = express();

//configuração do express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({ //recomendado usar o db Redis, pois o session pode usar muito cache
    secret: "algumacoisaqueeunaoseioquee",
    cookie: {maxAge: 3600000} //tempo definido para uso do cookie
}))

//configuração da view engine.
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));

//rotas
app.use('/', homeController);
app.use('/', categoriasController);
app.use('/', artigosController);
app.use('/', loginController);
app.use('/', notFoundController); //esse controller deve estar sempre por ultimo

app.listen(3333);