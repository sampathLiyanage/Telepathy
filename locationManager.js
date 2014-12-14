var geolib = require("geolib");

exports.getDistance = function(loc1,loc2){
    var dist = geolib.getDistance(loc1,loc2);
    console.log("distance is :" + dist);
	return dist;
}
