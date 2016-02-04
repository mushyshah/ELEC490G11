'use strict';


/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(D3, app, auth, database) {

  app.get('/api/d3/example/render', function(req, res, next) {
    D3.render('pagelayout2', {
      package: 'd3'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
});

  app.route('/api/d3/helpp/:filename')
    .get(function(req, res) {

            res.sendFile(__dirname + '/' + req.params.filename + '.csv');

             console.log('\n\nHALP MEH PLEASSEEE\n\n');
        });
};
