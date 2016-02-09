'use strict';

var responseModel = require('../models/response');

/*
exports.responseCheck = function(responseid,result){

    var r = 0;

    responseModel.findOne(responseid, function(err, response) {
            if (err)
                console.log(err);
            //res.json(response);
            // console.log('\n\nResponse Complete: %j',response) + '\n';
            r=response.completed;

            if(r==1)
                    result(r);
            else
              setTimeout(exports.responseCheck(responseid,result),5000);
              
        });   
};*/


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

    console.log("responseID at script:"+responseid);

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