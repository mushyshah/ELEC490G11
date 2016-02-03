'use strict';

var https = require('https');

exports.newResponse = function(result){
   
    var options = {
      host: 'queensu.fluidsurveys.com',
      port: '443',
      path: '/api/v3/surveys/980627/responses/',
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