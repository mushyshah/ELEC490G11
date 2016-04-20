'use strict';

var fluidApi = require('../scripts/fluidCalls');
var responseCheck = require('../scripts/responseCheck');
var responseModel = require('../models/response');

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Surveys, app, auth, database) {

  //Home Route
  var index = require('../controllers/index')(Surveys);

    app.route('/api/surveys/newResponse')
    .get(function(req, res) {
      
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
      });

  });

  app.route('/api/surveys/findResponse/:responseid')
    .get(function(req, res) {
        responseCheck.responseCheck(req.params.responseid,function(result){
        res.json(result);
      });
  });

app.route('/api/surveys/gaugeData/:responseid')
    .get(function(req, res) {
        responseCheck.responseCheck(req.params.responseid,function(result){
        var response = {};
        response['OSS'] = result.OSS;
        response['OMSS'] = result.OMSS;
        response['LBSS'] = result.LBSS;
        response['SESS'] = result.SESS;
        response['TRSS'] = anotherresult.TRSS;

        res.json(response);
      });
 

    });

    app.route('/api/surveys/isResponseComplete/:responseid')
    .get(function(req, res) {
      responseCheck.responseCheck(req.params.responseid, function(response) {
            if (err)
                res.send(err);
            
            res.send(response);
        });

    });


  app.route('/api/surveys/newSurvey')
    .get(index.render);

  app.route('/api/surveys/responseComplete')
    .post(function(req, res) {
        fluidApi.responseCompleted(req.body._id,function(result){});
  });


  app.route('/api/surveys/postFeedback')
    .post(function(req, res) {
        responseCheck.submitFeedback(req.body.responseID,req.body.feedbackMessage,function(result){});
        fluidApi.submitFeedback(req.body.responseID,req.body.feedbackMessage,function(result){});
  });

};
