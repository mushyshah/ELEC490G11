// Response Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DemoResponseSchema = new Schema({
	responseid: Number,
	completed: Number,
	updated: Number,
	feedbackMessage: String,
	feedbackComplete: Number,

	JB: Number,
	BS: Number,
	SS: Number,
	FD: Number,
	ZL: Number,

	JBR: Number,
	BSR: Number,
	SSR: Number,
	FDR: Number,
	ZLR: Number,
	
});

module.exports = mongoose.model('DemoResponse', DemoResponseSchema);