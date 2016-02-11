'use strict';

var animationModel = require('../models/animation');

exports.init = function(){

            var response = new animationModel();
            response.usage = 'state';
            response.serverup = false;
            response.serverdn = false;

            response.d3up = false;
            response.d3dn = false;
              
            response.mongoup = false;
            response.mongodn = false;
              
            response.fluidup = false;
            response.fluiddn = false;

            response.save(function(err) {
                          if (err)
                          output.send('NO-DATA');
                        });
        
};

exports.stateCheck = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {

                // var send = response;

                // response.serverup = false;
                // response.serverdn = false;

                // response.d3up = false;
                // response.d3dn = false;
                  
                // response.mongoup = false;
                // response.mongodn = false;
                  
                // response.fluidup = false;
                // response.fluiddn = false;

                // response.save(function(err){});

                result(response);

        });   
};


exports.serverup = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.serverup = true;
                response.save(function(err){});
        });   
};

exports.serverdn = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.serverdn = true;
                response.save(function(err){});
        });   
};

exports.d3up = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.d3up = true;
                response.save(function(err){});
        });   
};

exports.d3dn = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.d3dn = true;
                response.save(function(err){});
        });   
};

exports.mongoup = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.mongoup = true;
                response.save(function(err){});
        });   
};

exports.mongodn = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.mongodn = true;
                response.save(function(err){});
        });   
};

exports.fluidup = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.fluidup = true;
                response.save(function(err){});
        });   
};

exports.fluiddn = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.fluiddn = true;
                console.log("Saved:"+response);
                response.save(function(err){});
        });   
};



