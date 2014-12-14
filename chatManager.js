var userManager = require("./userManager");
var messageManager = require("./messageManager");
var locManager = require("./locationManager");

function ChatManager(){
	this.users = [];
	this.messages = [];
	this.userCount = 0;
	this.messageCount = 0;
}

ChatManager.prototype.addUser = function(location){
	var user = userManager.getNewUser(this.userCount, location);
	this.userCount++;
	this.users.push(user);
	return user;
}

ChatManager.prototype.sendMessage = function(user, message, location){
	var newMessage = messageManager.createMessage(this.messageCount, user.id, message, location);
	this.messageCount++;
	this.messages.push(newMessage);
}

ChatManager.prototype.getMessages = function(loc){
    var output = {};
	for(var i in this.messages){
	    var dist = locManager.getDistance(this.messages[i].location,loc);
		if (dist < 100000){
			output[i] = this.messages[i];
		}
	}
	return output;
}

var chatManager = new ChatManager();
exports.getInstance = function(){
	return chatManager;
}