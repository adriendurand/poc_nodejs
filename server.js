var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'securekey'}))


/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* On affiche la todolist et le formulaire */
.get('/', function(req, res) { 
    res.render('index.ejs', {todolist: req.session.todolist});
})

/* On ajoute un élément à la todolist */
.post('/add/', urlencodedParser, function(req, res) {
    if (req.body.item != '') {
        req.session.todolist.push(req.body.item);
    }
    res.redirect('/');
})

/* Supprime un élément de la todolist */
.get('/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/');
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/');
})

.listen(8081);