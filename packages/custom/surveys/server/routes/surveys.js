'use strict';

//Import required scripts
var fluidApi = require('../scripts/fluidCalls');
var responseCheck = require('../scripts/responseCheck');
var responseModel = require('../models/response');

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Surveys, app, auth, database) {

  //Home Route
  var index = require('../controllers/index')(Surveys);

    //This route requests fluid to create a new empty 
    // survey response and provide the necessary data for it.
    // This route is called by the main survey html 
    app.route('/api/surveys/newResponse')
    .get(function(req, res) {
      
      //Call api script to request survey from fluid
      fluidApi.newResponse(function(result){

        //Return result from fluid to client
        res.json(result);

        //Create a new instance of the response model
        var response = new responseModel();   

        //Store initial parameters, ID, survey completion
        // and feedback completion to model    
        response.responseid = result._id;  // set id
        response.completed = 0;
        response.feedbackComplete = 0;

        //Save the response model to the DB and check for errors
        response.save(function(err) {
            if (err)
                res.send(err);
        });
      });

  });

  //This GET route is used to return the response data of a 
  // specific survey response indicated by ':responseid'.
  //This data is used by the spider chart on the results page
  app.route('/api/surveys/findResponse/:responseid')
    .get(function(req, res) {

        //Call responsecheck script that checks localdb for results
        responseCheck.responseCheck(req.params.responseid,function(result){
          //Return results
        res.json(result);
      });
  });

  //This GET route is used to return the response data of a 
  // specific survey response indicated by ':responseid'.
  //This data is used by the gauges on the results page
  //as it is required in a different format
app.route('/api/surveys/gaugeData/:responseid')
    .get(function(req, res) {

        //Call responsecheck script that checks localdb for results
        responseCheck.responseCheck(req.params.responseid,function(result){
        var response = {};
        response['OSS'] = result.OSS;
        response['OMSS'] = result.OMSS;
        response['LBSS'] = result.LBSS;
        response['SESS'] = result.SESS;
        response['TRSS'] = result.TRSS;

        res.json(response);
      });
 

    });

    //This route is created for the polling mechanism.
    //It is called several times to see whether or not 
    // response has been completed yet (as reported by
    //  data in the db)
    app.route('/api/surveys/isResponseComplete/:responseid')
    .get(function(req, res) {
      //Call responseCheck script
      responseCheck.responseCheck(req.params.responseid, function(response) {
            res.send(response);
        });

    });


  //Unused atm
  app.route('/api/surveys/newSurvey')
    .get(index.render);

  //This POST route is called from the webhook callback 
  // from fluid surveys when a particular survey is completed.
  //  The webhook also passes all the survey data to the surver
  //   which is passed to the responseCompleted function on the 
  //    server and stored to the local db
  app.route('/api/surveys/responseComplete')
    .post(function(req, res) {
        fluidApi.responseCompleted(req.body._id,function(result){});
  });

  //This post route is called by the results page. It is called
  // when feedback is posted from the feedback box. This route
  //  calls the local submitFeedback scripts that both store
  //   the feedback to the local db as well as push it to fluid
  app.route('/api/surveys/postFeedback')
    .post(function(req, res) {
        responseCheck.submitFeedback(req.body.responseID,req.body.feedbackMessage,function(result){});
        fluidApi.submitFeedback(req.body.responseID,req.body.feedbackMessage,function(result){});
  });

};
