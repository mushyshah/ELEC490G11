// Response Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResponseSchema = new Schema({
	responseid: Number,
	completed: Number
});

module.exports = mongoose.model('Response', ResponseSchema);