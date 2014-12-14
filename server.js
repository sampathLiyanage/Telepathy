    var http = require("http");
    var url = require('url');
    var fs = require('fs');
	var io = require("socket.io");
	var chatManager = require("./chatManager").getInstance();
	
	
    var server = http.createServer(function(request, response){
        console.log('Connection');
		
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
	

	io.listen(server).on('connection', function(socket){
		
		
		var user;
		socket.on('initFromClient', function(data){
            user = chatManager.addUser(data.location);
		    socket.emit('messagesFromServer', {'messages': chatManager.getMessages(), 'userId': user.id}); // Send message to sender
		});
		socket.on('messageFromClient', function(data){
			chatManager.sendMessage(user, data.message);
			socket.emit('messagesFromServer', {'messages': chatManager.getMessages(), 'userId': user.id}); // Send message to sender
			socket.broadcast.emit('messagesFromServer', {'messages': chatManager.getMessages()}); // Send message to everyone BUT sender
		}); 
		socket.on('locationFromClient', function(data){
			user.location = data.location;
			socket.emit('messages', {'messages': chatManager.getMessages(), 'userId': user.id}); // Send message to sender
		}); 
	});
	

