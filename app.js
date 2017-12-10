var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

io.sockets.on('connection', function (socket, login) {

	socket.on('newClient', function(login) {
		login = ent.encode(login);
		socket.login = login;
		socket.broadcast.emit('newClient', login);
	});    

	socket.on("newMessage", function(message){
		message = ent.encode(message);

		socket.broadcast.emit("newMessage", {"login": socket.login, "message": message});		
	});
});

server.listen(8080);