// Response Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ResponseSchema = new Schema({
	//Response ID
	responseid: Number,
	
	//Whether survey was completed or not
	completed: Number,
	
	//Whether survey was updated or not (not used atm)
	updated: Number,

	//String field to contain feedback message
	feedbackMessage: String,
	//Field to use as a flag to indicate whether or not feedback
	// has been completed or not
	feedbackComplete: Number,

	//Fields to hold all the different data
	OM1: Number,
	OM2r: Number,
	OM3r: Number,
	OM6: Number,
	OMSS: Number,
	OMR: Number,

	LB1: Number,
	LB2: Number,
	LB3r: Number,
	LB4: Number,
	LB6: Number,
	LBSS: Number,
	LBR: Number,

	SE1r: Number,
	SE2: Number,
	SE3: Number,
	SE4: Number,
	SE6: Number,
	SESS: Number,
	SER: Number,

	TR1: Number,
	TR2: Number,
	TR3: Number,
	TR5: Number,
	TRSS: Number,
	TRR: Number,

	O1: Number,
	O2: Number,
	O3r: Number,
	O4: Number,
	O6: Number,
	OSS: Number,
	OR: Number
	
});

//Export model
module.exports = mongoose.model('Response', ResponseSchema);