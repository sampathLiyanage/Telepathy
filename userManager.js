function User(id, location){
	this.id = id;
	this.location = location;
}

exports.getNewUser = function(userName, location){
	return new User(userName, location);
}