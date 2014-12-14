var userManager = require("./userManager");
var messageManager = require("./messageManager");

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

ChatManager.prototype.getMessages = function(){
	return this.messages;
}

var chatManager = new ChatManager();
exports.getInstance = function(){
	return chatManager;
}