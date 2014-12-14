function ChatMessage(id, userId, message, location){
	this.id = id;
	this.userId = userId;
	this.message = message;
	this.location = location;
	this.time = new Date().toString();
}

exports.createMessage = function(id, user, message, location){
	return new ChatMessage(id, user, message, location);
}