'use strict';

var fluidApi = require('../scripts/fluidCalls');
var responseCheck = require('../scripts/responseCheck');
var responseModel = require('../models/response');
var animationModel = require('../scripts/animation');

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Demo, app, auth, database) {

  app.route('/api/demo/newResponse')
    .get(function(req, res) {

      animationModel.serverdn(function(){

      fluidApi.newResponse(function(result){
        res.json(result);
        var response = new responseModel();      // create a new instance 
        response.responseid = result._id;  // set id
        response.completed = 0;
        response.feedbackComplete = 0;

        // save the response and check for errors
        response.save(function(err) {
            if (err)
                res.send(err);
        });

        animationModel.fluiddn(function(){
            animationModel.mongodn(function(){});
        });
      });


      })


  });

  app.route('/api/demo/state')
    .get(function(req, res) {
        animationModel.stateCheck(function(result){
        res.json(result);
      });
        animationModel.resetState(function(){});
  });

  app.route('/api/demo/findResponse/:responseid')
    .get(function(req, res) {
      animationModel.d3up(function(){
        animationModel.mongoup(function(){
          animationModel.serverup(function(){});
        });

      });
      console.log('responseid = '+req.params.responseid);
        responseCheck.responseCheck(req.params.responseid,function(result){
        res.json(result);
      });
  });


    app.route('/api/demo/isResponseComplete/:responseid')
    .get(function(req, res) {

      animationModel.serverdn(function(){});
      responseCheck.responseCheck(req.params.responseid, function(response) {

             if(response.completed==1)
              animationModel.serverup(function(){});
            res.send(response);
        });

    });

  app.route('/api/demo/responseComplete')
    .post(function(req, res) {

        animationModel.fluidup(function(){
            animationModel.mongodn(function(){

        fluidApi.responseCompleted(req.body._id,function(result){});


            });

        });
  });


  app.route('/api/demo/postFeedback')
    .post(function(req, res) {

        animationModel.serverdn(function(){

                  animationModel.fluiddn(function(){});

        });


        console.log(req.body.feedbackMessage);
        responseCheck.submitFeedback(req.body.responseID,req.body.feedbackMessage,function(result){
        });

        fluidApi.submitFeedback(req.body.responseID,req.body.feedbackMessage,function(result){});

  });

};
