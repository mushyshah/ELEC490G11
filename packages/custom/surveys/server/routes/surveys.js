'use strict';

var fluidApi = require('../scripts/fluidCalls');
var responseCheck = require('../scripts/responseCheck');
var responseModel = require('../models/response');


/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Surveys, app, auth, database) {

  //Home Route
  var index = require('../controllers/index')(Surveys);

    // app.route('/')
    // .get(index.render);

    app.route('/api/surveys/newResponse')
    .get(function(req, res) {
      fluidApi.newResponse(function(result){
        console.log('\n\nOUTPUT AT ROUTER: %j',result) + '\n';
        res.json(result);
        var response = new responseModel();      // create a new instance 
        response.responseid = result._id;  // set id
        response.completed = 0;
        // save the response and check for errors
        response.save(function(err) {
            if (err)
                res.send(err);

            //res.json({ message: 'Response created!' });
        });
      });
  });

  app.route('/api/surveys/findResponse/:responseid')
    .get(function(req, res) {
        responseCheck.responseCheck(req.params.responseid,function(result){
        //res.json(result);
        var x = 'group,axis,value,description\n'+
            'Rubric,Learns Independently,'+result.OR+', \n'+
            'Rubric,Self Motivated,'+result.OMR+', \n'+
            'Rubric,Flexible Learner,'+result.LBR+', \n'+
            'Rubric,Confident,'+result.SER+', \n'+
            'Rubric,Makes Connections,'+result.TRR+', \n'+
            'Your Score,Learns Independently,'+result.OSS+', \n'+
            'Your Score,Self Motivated,'+result.OMSS+', \n'+
            'Your Score,Flexible Learner,'+result.LBSS+', \n'+
            'Your Score,Confident,'+result.SESS+', \n'+
            'Your Score,Makes Connections,'+result.TRSS+', '
            ;
        res.send(x);
      //console.log('\n\nResponse Data: %j',result) + '\n';
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
      //console.log('\n\nResponse Data: %j',result) + '\n';
      });
 
   // app.route('/api/surveys/findResponse/:responseid')
   //  .get(function(req, res) {
   //      fluidApi.responseCompleted(req.params.responseid,function(result){
   //      res.json(result);
   //    //console.log('\n\nResponse Data: %j',result) + '\n';
   //    });

    });

    app.route('/api/surveys/isResponseComplete/:responseid')
    .get(function(req, res) {
      console.log('\n\n Checking response for: %d',req.params.responseid) + '\n';
      responseCheck.responseCheck({responseid:req.params.responseid}, function(response) {
            //if (err)
                //res.send(err);
            //res.json(response);
             console.log('\n\nResponse Complete: %j',response) + '\n';
            res.send(response);
        });

    });


  app.route('/api/surveys/newSurvey')
    .get(index.render);

  app.route('/api/surveys/responseComplete')
    .post(function(req, res) {

        console.log("RESPONSE COMPLETED = "+req.body._id);
        //fluidApi.responseCompleted(req.body._id,function(result){});

        res.send("thanks");
  });

};
