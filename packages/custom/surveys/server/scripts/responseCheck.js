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


exports.responseCheck = function(responseid, result){

    responseModel.findOne(responseid, function(err, response) {
            if (err)
                console.log(err);

                response.updated=0;

                response.save(function(err) {
                          if (err)
                          output.send('NO-DATA');
                        });

                    result(response);
              
        });   
};