'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var D3 = new Module('d3');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
D3.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  D3.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  D3.menus.add({
    title: 'd3 example page',
    link: 'd3 example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  D3.aggregateAsset('css', 'd3.css');
  
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    D3.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    D3.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    D3.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return D3;
});


