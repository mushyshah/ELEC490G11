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
             console.log(options.host + ':' + res.statusCode);
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

    // console.log('\n\nURL RESULT: ' + result.url) + '\n';
    //return result;
}

exports.submitFeedback = function(responseid,message,result){
       var fdata = {};
    fdata[feedbackQuestionID] = message;
  var request = require("request");

      var options = { method: 'PUT',
            url: 'http://'+ surveyHost +'/api/v3/surveys/'+ surveyID +'/responses/'+responseid+'/',
            headers: 
               { 'cache-control': 'no-cache',
                 authorization: auth
               },
            formData: fdata
      };

request(options, function (error, response, body) {
  console.log(options.host + options.path + ':' + response.statusCode);
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
              //output(parsed);

                    responseModel.findOne({'responseid' : responseid}, function(err, result) {

                    // if (err)
                    //     res.send(err);

                    // save the response and check for errors
                    result.completed = 1;
                    result.responseid = responseid;

                    result.JB = parsed[surveyParams.JB] ;
                    result.BS = parsed[surveyParams.BS] ;
                    result.SS = parsed[surveyParams.SS] ;
                    result.FD = parsed[surveyParams.FD] ;
                    result.ZL = parsed[surveyParams.ZL] ;

                    result.JBR = 1.2 ;
                    result.BSR = 3.2 ;
                    result.SSR = 2.4 ;
                    result.FDR = 3.8 ;
                    result.ZLR = 0.7 ;


                          result.save(function(err) {
                          if (err)
                          output.send('NO-DATA');
                        });
                 output(result);

                  });
      });

    });

    // write the request parameters
    req.write('');
    req.end();

}

