'use strict';

var https = require('https');
var responseModel = require('../models/response');

exports.newResponse = function(result){
   
    var options = {
      host: 'queensu.fluidsurveys.com',
      port: '443',
      //path: '/api/v3/surveys/987323/responses/',
      path: '/api/v3/surveys/1455865/responses/',
      //Authorization: 'Basic MW1tczNAcXVlZW5zdS5jYTpicmlhbmZyYW5r',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ZW5naW5lZXJpbmcuc3VydmV5c0BxdWVlbnN1LmNhOnN1cnZleXMyMDE1'
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
                console.log("\n\nResponse:\n %j \n", parsed);
                });

    });



    // write the request parameters
    req.write('');
    req.end();

    // console.log('\n\nURL RESULT: ' + result.url) + '\n';
    //return result;
}

exports.submitFeedback = function(responseid,message,result){
   
  var request = require("request");

var options = { method: 'PUT',
  url: 'http://queensu.fluidsurveys.com/api/v3/surveys/1455865/responses/'+responseid+'/',
  headers: 
   { 'cache-control': 'no-cache',
     authorization: 'Basic ZW5naW5lZXJpbmcuc3VydmV5c0BxdWVlbnN1LmNhOnN1cnZleXMyMDE1'},
  formData: { qeoQ28N2xy: message } };

request(options, function (error, response, body) {
  console.log(options.host + options.path + ':' + response.statusCode);
  if (error) throw new Error(error);

  console.log(body);
});

}



exports.responseCompleted = function(responseid, output){
   
    var options = {
      host: 'queensu.fluidsurveys.com',
      port: '443',
      //path: '/api/v3/surveys/987323/responses/'+responseid+'/',
      path: '/api/v3/surveys/1455865/responses/'+responseid+'/',
      //Authorization: 'Basic MW1tczNAcXVlZW5zdS5jYTpicmlhbmZyYW5r',
      method: 'GET',
      headers: {
        'Authorization': 'Basic ZW5naW5lZXJpbmcuc3VydmV5c0BxdWVlbnN1LmNhOnN1cnZleXMyMDE1'
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
              console.log("\n\nGET RESPONSE:"+ body + "\n\n");

                    responseModel.findOne({'responseid' : responseid}, function(err, result) {

                      console.log("RESULT OF FETCH: %j",result);
                    // if (err)
                    //     res.send(err);

                    // save the response and check for errors
                    result.completed = 1;
                    result.responseid = responseid;

                    result.JB = parsed['qBaao3MphC'] ;
                    result.BS = parsed['q6fy0L54Ot'] ;
                    result.SS = parsed['nP7DrNCUzl'] ;
                    result.FD = parsed['oxyVy2MI50'] ;
                    result.ZL = parsed['HC0F9B7MyR'] ;

                    result.JBR = 1.2 ;
                    result.BSR = 3.2 ;
                    result.SSR = 2.4 ;
                    result.FDR = 3.8 ;
                    result.ZLR = 0.7 ;


                          result.save(function(err) {
                          if (err)
                          output.send('NO-DATA');
                        });

                //     var complete = req.body;

                // console.log('\n\nResponse Complete: %j',complete) + '\n';

                 console.log('\n\nSAVED STUFF: \n' + result) + '\n';
                 output(result);

                  });
      });

    });

    // write the request parameters
    //req.write(':id:'+responseid);
    req.write('');
    req.end();

    //return result;
}

