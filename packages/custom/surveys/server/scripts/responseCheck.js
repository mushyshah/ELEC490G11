'use strict';

var responseModel = require('../models/response');

exports.submitFeedback = function(responseid, message, result){

    responseModel.findOne({responseid : responseid}, function(err, response) {
           
            if (err)
                console.log(err);

            if(response.feedbackComplete!=1){
            response.responseid = responseid;
            response.feedbackMessage = message;
            response.feedbackComplete = 1;

        }
        
    response.save(function(err) {
              if (err)
                output.send('NO-DATA');
        });
             result(response);          
        });   
};


exports.responseCheck = function(responseid, result){

    responseModel.findOne({'responseid' : responseid}, function(err, response) {
            if (err)
                console.log(err);
            else if (response == null)
                console.log('NO-DATA');
            else{
                response.save(function(err){});
                result(response);
              }
        });   
};