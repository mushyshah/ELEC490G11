'use strict';


/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(D3, app, auth, database) {

  app.get('/api/d3/example/render', function(req, res, next) {
    D3.render('index', {
      package: 'd3'
    }, function(err, html) {
      res.send(html);
    });
});

};
