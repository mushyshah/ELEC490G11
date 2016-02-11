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
        console.log('\n\nOUTPUT AT ROUTER: %j',result) + '\n';
        res.json(result);
        var response = new responseModel();      // create a new instance 
        response.responseid = result._id;  // set id
        response.completed = 0;
        response.feedbackComplete = 0;
        // save the response and check for errors
        response.save(function(err) {
            if (err)
                res.send(err);

            //res.json({ message: 'Response created!' });
        });

        animationModel.fluiddn(function(){
            animationModel.mongodn(function(){});
        });
      });


      })


  });

  app.route('/api/demo/state')
    .get(function(req, res) {

      console.log('requesting state');
        animationModel.stateCheck(function(result){
        res.json(result);
        console.log("OUTOUT: "+result);
      });
        animationModel.resetState(function(){});
  });

  app.route('/api/demo/findResponse/:responseid')
    .get(function(req, res) {

      console.log('responseid = '+req.params.responseid);
        responseCheck.responseCheck(req.params.responseid,function(result){
        res.json(result);
      });
  });


    app.route('/api/demo/isResponseComplete/:responseid')
    .get(function(req, res) {

      animationModel.serverdn(function(){});
      console.log('\n\n Checking response for: %d',req.params.responseid) + '\n';
      responseCheck.responseCheck(req.params.responseid, function(response) {
            //if (err)
                //res.send(err);
            //res.json(response);
             console.log('\n\nResponse Complete: %j',response) + '\n';
             if(response.completed==1)
              animationModel.serverup(function(){});
            res.send(response);
        });

    });

  app.route('/api/demo/responseComplete')
    .post(function(req, res) {

        animationModel.fluidup(function(){
            animationModel.mongodn(function(){


        console.log("RESPONSE COMPLETED = "+req.body._id);
        fluidApi.responseCompleted(req.body._id,function(result){});

        res.send("thanks");

            });

        });
  });


  app.route('/api/demo/postFeedback')
    .post(function(req, res) {

        // animationModel.serverdn();
        // animationModel.fluiddn();

        console.log(req.body.feedbackMessage);
        responseCheck.submitFeedback(req.body.responseID,req.body.feedbackMessage,function(result){
        });

        fluidApi.submitFeedback(req.body.responseID,req.body.feedbackMessage,function(result){});

  });

};
