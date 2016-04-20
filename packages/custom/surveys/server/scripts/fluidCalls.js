'use strict';

var https = require('https');
var responseModel = require('../models/response');
var surveyParams = require('../config/surveyconfig.json');

 var surveyHost = surveyParams.surveyHost;
 var surveyID = surveyParams.surveyID;
 var feedbackQuestionID = surveyParams.feedbackQuestionID;
 var username = surveyParams.surveyUsername;
 var password = surveyParams.surveyPassword;
 var auth = "Basic " + new Buffer(username + ":" + password, "utf8").toString("base64");

exports.newResponse = function(result){
   
    var options = {
      host: surveyHost,
      port: '443',
      path: '/api/v3/surveys/'+surveyID+'/responses/',
      method: 'POST',
      headers: {
        'Authorization': auth
      }
    };

    //var result;
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

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            result(parsed);
            });

    });



    // write the request parameters
    req.write('');
    req.end();

}

exports.submitFeedback = function(responseid,message,result){
   
      var request = require("request");

      var options = { method: 'PUT',
            url: 'http://'+ surveyHost +'/api/v3/surveys/'+ surveyID +'/responses/'+responseid+'/',
            headers: 
               { 'cache-control': 'no-cache',
                 authorization: auth
               },
            formData: { feedbackQuestionID.toString(): message } 
      };

      request(options, function (error, response, body) {
        console.log(options.formData + ' : ' + message);
        console.log(options.url + ':' + response.statusCode);
        if (error) throw new Error(error);

        console.log(body);
      });

}



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

    //var result;
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

              // Data reception is done, do whatever with it!
              var parsed = JSON.parse(body);

                    responseModel.findOne({'responseid' : responseid}, function(err, result) {
                     if (err)
                         res.send(err);

                    // save the response and check for errors
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


                    result.save(function(err) {
                    if (err)
                    output.send('NO-DATA');
                    });

                   output(result);

                  });
      });

    });

    req.write('');
    req.end();

}

