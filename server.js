    var http = require("http");
    var url = require('url');
    var fs = require('fs');
	var io = require("socket.io");
	var chatManager = require("./chatManager").getInstance();
	var locManager = require("./locationManager");
	
    var server = http.createServer(function(request, response){
		fs.readFile(__dirname + "/" + "chat.html", function(error, data){
				if (error){
						response.writeHead(404);
						response.write("opps this doesn't exist - 404");
				}
				else{
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write(data, "utf8");
				}
				response.end();
           });
    });

    server.listen(3000);
	
	var clients = [];
	io = io.listen(server);
	io.sockets.on('connection', function(socket){
		var user;
		socket.on('initFromClient', function(data){
            user = chatManager.addUser(data.location);
			clients.push({user : user, socId : socket.id});
		    socket.emit('messagesFromServer', {'messages': chatManager.getMessages(user.location), 'userId': user.id}); // Send message to sender
		});
		socket.on('messageFromClient', function(data){
			chatManager.sendMessage(user, data.message, user.location);
			socket.emit('messagesFromServer', {'messages': chatManager.getMessages(user.location), 'userId': user.id}); // Send message to sender
			clients.forEach(function(v,i){
				console.log(locManager.getDistance(v.user.location,user.location) < 100000);
				if (locManager.getDistance(v.user.location,user.location) < 100000){
					io.sockets.socket(v.socId).emit('messagesFromServer', {'messages': chatManager.getMessages(v.user.location)}); // Send message to everyone BUT sender
				}
			});
		}); 
		socket.on('locationFromClient', function(data){
			user.location = data;
			socket.emit('messages', {'messages': chatManager.getMessages(user.location), 'userId': user.id}); // Send message to sender
			clients.forEach(function(v,i){
				if (locManager.getDistance(v.user.location,user.location) < 100000){
					io.sockets.socket(v.socId).emit('messagesFromServer', {'messages': chatManager.getMessages(v.user.location)}); // Send message to everyone BUT sender
				}
			});
		}); 
	});
	

