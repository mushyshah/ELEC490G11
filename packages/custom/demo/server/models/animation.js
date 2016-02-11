// Response Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimationSchema = new Schema({

	usage: String,

	serverup: Boolean,
	serverdn: Boolean,

	d3up: Boolean,
	d3dn: Boolean,
	  
	mongoup: Boolean,	 
	mongodn: Boolean,
	  
    fluidup: Boolean,
	fluiddn: Boolean,

	
});

module.exports = mongoose.model('AnimationState', AnimationSchema);