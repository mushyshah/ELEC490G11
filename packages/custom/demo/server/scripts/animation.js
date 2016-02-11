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

                result(response);
        });   
};

exports.resetState = function(){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {

                response.serverup = false;
                response.serverdn = false;

                response.d3up = false;
                response.d3dn = false;
                  
                response.mongoup = false;
                response.mongodn = false;
                  
                response.fluidup = false;
                response.fluiddn = false;

                response.save(function(err){});

        });   
};


exports.serverup = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.serverup = true;
                response.save(function(err){});
                result();
        });   
};

exports.serverdn = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.serverdn = true;
                response.save(function(err){});
                result();
        });   
};

exports.d3up = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.d3up = true;
                response.save(function(err){});
                result();
        });   
};

exports.d3dn = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.d3dn = true;
                response.save(function(err){});
                result();
        });   
};

exports.mongoup = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.mongoup = true;
                response.save(function(err){});
                result();
        });   
};

exports.mongodn = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.mongodn = true;
                response.save(function(err){});
                result();
        });   
};

exports.fluidup = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.fluidup = true;
                response.save(function(err){});
                result();
        });   
};

exports.fluiddn = function(result){

    animationModel.findOne({'usage' : 'state'}, function(err, response) {
                response.fluiddn = true;
                console.log("Saved:"+response);
                response.save(function(err){});
                result();
        });   
};



