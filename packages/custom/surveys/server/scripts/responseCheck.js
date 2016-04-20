'use strict';

//Import Response Model
var responseModel = require('../models/response');

//Submit feedback function for the local database
exports.submitFeedback = function(responseid, message, result){

    //Find item in db with specific responseid
    responseModel.findOne({responseid : responseid}, function(err, response) {
           
            if (err)
                console.log(err);

            //If feedback isn't already completed, 
            // add feedback message to database
            // and set flag to true
            if(response.feedbackComplete!=1){
            response.responseid = responseid;
            response.feedbackMessage = message;
            response.feedbackComplete = 1;

        }
        
    //Save data to DB
    response.save(function(err) {
              if (err)
                output.send('NO-DATA');
        });
             result(response);          
        });   
};

//Response check function, used to check/return data
// from DB of specific response
exports.responseCheck = function(responseid, result){

    //Find item in db with specific responsid
    responseModel.findOne({'responseid' : responseid}, function(err, response) {
            if (err)
                console.log(err);
            else if (response == null)
                console.log('NO-DATA');
            else{
                //Return the response data if exists
                response.save(function(err){});
                result(response);
              }
        });   
};