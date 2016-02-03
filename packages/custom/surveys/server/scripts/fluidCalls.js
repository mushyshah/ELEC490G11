'use strict';

var https = require('https');
var responseModel = require('../models/response');

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

exports.responseCompleted = function(responseid, output){
   
    var options = {
      host: 'queensu.fluidsurveys.com',
      port: '443',
      path: '/api/v3/surveys/980627/responses/'+responseid+'/',
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
              console.log("\n\nGET RESPONSE:\n"+ parsed + "\n\n");

                    responseModel.findOne(responseid, function(err, result) {
                    // if (err)
                    //     res.send(err);

                    // save the response and check for errors
                    result.completed = 1;

                    //var OM2r = res.body.7yUn21RPTu;

                    result.OM1 = parsed['nP7DrNCUzl'] ;
                    result.OM2r = 4-parsed['7yUn21RPTu'] ;
                    result.OM3r = 4-parsed['cbIq7Kn8gd'] ;
                    result.OM6 = parsed['t1eODgq9GZ'] ;
                    result.OMSS = (result.OM1 + result.OM2r + result.OM3r)/3 ;
                    result.OMR = result.OM6;

                    result.LB1 = parsed['KMixbRcThI'] ;
                    result.LB2 = parsed['PJ4pJtSrPn'] ;
                    result.LB3r = 4-parsed['NScbd99MKi'] ;
                    result.LB4 = parsed['tPQ2De8LaI'] ;
                    result.LB6 = parsed['CGTvWJbSTA'] ;
                    result.LBSS = (result.LB1 + result.LB2 + result.LB3r + result.LB4)/4 ;
                    result.LBR = result.LB6;

                    result.SE1r = 4-parsed['KqLlS9LTKI'] ;
                    result.SE2 = parsed['VlqbTTdS9o'] ;
                    result.SE3 = parsed['udTJecFeh6'] ;
                    result.SE4 = parsed['0ovHVkmbwk'] ;
                    result.SE6 = parsed['oAVAhQJTef'] ;
                    result.SESS = (result.SE1r + result.SE2 + result.SE3 + result.SE4)/4 ;
                    result.SER = result.SE6;

                    result.TR1 = parsed['Dd5GrseoXe'] ;
                    result.TR2 = parsed['yvTAGH0p0t'] ;
                    result.TR3 = parsed['Jn9Ao7xQ9m'] ;
                    result.TR5 = parsed['WRVhpoDzVr'] ;
                    result.TRSS = (result.TR1 + result.TR2 + result.TR3)/3 ;
                    result.TRR = result.TR5;

                    result.O1 = parsed['hhXNiXRVRk'] ;
                    result.O2 = parsed['ndNlTZGveV'] ;
                    result.O3r = 4-parsed['DN8mZnESRy'] ;
                    result.O4 = parsed['IMXNDQPfz5'] ;
                    result.O6 = parsed['WCWhpU2JHU'] ;
                    result.OSS = (result.O1 + result.O2 + result.O3r + result.O4)/4 ;
                    result.OR = result.O6;


                          result.save(function(err) {
                          if (err)
                          res.send(err);
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