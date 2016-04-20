'use strict';

var https = require('https');

//Import response database model
var responseModel = require('../models/response');

//Import config parameters for survey
var surveyParams = require('../config/surveyconfig.json');

//Initializing variables from survey params
 var surveyHost = surveyParams.surveyHost;
 var surveyID = surveyParams.surveyID;
 var feedbackQuestionID = surveyParams.feedbackQuestionID;
 var username = surveyParams.surveyUsername;
 var password = surveyParams.surveyPassword;

 //base64 encoded authentication
 var auth = "Basic " + new Buffer(username + ":" + password, "utf8").toString("base64");

//This function does a get response to fluidsurveys to get a new fluid response
exports.newResponse = function(result){

  //Create GET options
    var options = {
      host: surveyHost,
      port: '443',
      path: '/api/v3/surveys/'+surveyID+'/responses/',
      method: 'POST',
      headers: {
        'Authorization': auth
      }
    };

    //Create what happens upon performing the request
    var req = https.request(options,function(res) {
             console.log(options.host + options.path + ':' + res.statusCode);
             res.setEncoding('utf8');

      //Continuously update stream with data
            var body = '';
            res.on('data', function(d) {
                body += d;
            });
            res.on('end', function() {

            // Data reception is done, return it
            var parsed = JSON.parse(body);
            result(parsed);
            });

    });



    //Perform the request
    req.write('');
    req.end();

}

//This function pushes the message provided back to fluid surveys
// at the response id provided. It pushes it to a 'hidden' question 
//  as specified by the 'feedbackQuestionID' field in the response model
exports.submitFeedback = function(responseid,message,result){

    //Create variable key JSON for formdata
    var fdata = {};
    fdata[feedbackQuestionID] = message;

      //Require request module
      var request = require("request");

      //Create optinos for request
      var options = { method: 'PUT',
            url: 'http://'+ surveyHost +'/api/v3/surveys/'+ surveyID +'/responses/'+responseid+'/',
            headers: 
               { 'cache-control': 'no-cache',
                 authorization: auth
               },
            formData: fdata
      };

      //Log data and response upon pushing feedback
      request(options, function (error, response, body) {
        console.log(options.formData + ' : ' + message);
        console.log(options.url + ':' + response.statusCode);
        if (error) throw new Error(error);
        console.log(body);
      });

}


//Function used to retrieve all the data for the specific survey response
// after the response has been completed. A GET request is done to the 
//  fluid survers to retrieve all the data of the specific response
//   and then store it in the local DB
exports.responseCompleted = function(responseid, output){
      
    var options = {
      host: surveyHost,
      port: '443',
      path: '/api/v3/surveys/'+surveyID+'/responses/'+responseid+'/',
      method: 'GET',
      headers: {
        'Authorization': auth
      }
    };

    //Create HTTP request options
    var req = https.request(options,function(res) {

      // res is here
             console.log(options.host + options.path + ':' + res.statusCode);
             res.setEncoding('utf8');
      // Continuously update stream with data
            var body = '';
            res.on('data', function(d) {
                body += d;
            });

          res.on('end', function() {

              // Data reception is done
              var parsed = JSON.parse(body);

                    //Find article in database that corresponds to this specific responsID
                    responseModel.findOne({'responseid' : responseid}, function(err, result) {
                     if (err)
                         res.send(err);

                    //Save all the response data in DB with responseID
                    result.completed = 1;
                    result.responseid = responseid;

                    result.OM1 = parsed[surveyParams.OM1] ;
                    result.OM2r = 4-parsed[surveyParams.OM2r] ;
                    result.OM3r = 4-parsed[surveyParams.OM3r] ;
                    result.OM6 = parsed[surveyParams.OM6] ;
                    result.OMSS = (result.OM1 + result.OM2r + result.OM3r)/3 ;
                    result.OMR = result.OM6;

                    result.LB1 = parsed[surveyParams.LB1] ;
                    result.LB2 = parsed[surveyParams.LB2] ;
                    result.LB3r = 4-parsed[surveyParams.LB3r] ;
                    result.LB4 = parsed[surveyParams.LB4] ;
                    result.LB6 = parsed[surveyParams.LB6] ;
                    result.LBSS = (result.LB1 + result.LB2 + result.LB3r + result.LB4)/4 ;
                    result.LBR = result.LB6;

                    result.SE1r = 4-parsed[surveyParams.SE1r] ;
                    result.SE2 = parsed[surveyParams.SE2] ;
                    result.SE3 = parsed[surveyParams.SE3] ;
                    result.SE4 = parsed[surveyParams.SE4] ;
                    result.SE6 = parsed[surveyParams.SE6] ;
                    result.SESS = (result.SE1r + result.SE2 + result.SE3 + result.SE4)/4 ;
                    result.SER = result.SE6;

                    result.TR1 = parsed[surveyParams.TR1] ;
                    result.TR2 = parsed[surveyParams.TR2] ;
                    result.TR3 = parsed[surveyParams.TR3] ;
                    result.TR5 = parsed[surveyParams.TR5] ;
                    result.TRSS = (result.TR1 + result.TR2 + result.TR3)/3 ;
                    result.TRR = result.TR5;

                    result.O1 = parsed[surveyParams.O1] ;
                    result.O2 = parsed[surveyParams.O2] ;
                    result.O3r = 4-parsed[surveyParams.O3r] ;
                    result.O4 = parsed[surveyParams.O4] ;
                    result.O6 = parsed[surveyParams.O6] ;
                    result.OSS = (result.O1 + result.O2 + result.O3r + result.O4)/4 ;
                    result.OR = result.O6;

                    //Save result to DB
                    result.save(function(err) {
                    if (err)
                    output.send('NO-DATA');
                    });

                    //Return result
                   output(result);

                  });
      });

    });

    req.write('');
    req.end();

}

