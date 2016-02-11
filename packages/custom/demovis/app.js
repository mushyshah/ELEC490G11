'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Demovis = new Module('demovis');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Demovis.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Demovis.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Demovis.menus.add({
    title: 'demovis example page',
    link: 'demovis example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Demovis.aggregateAsset('css', 'demovis.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Demovis.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Demovis.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Demovis.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Demovis;
});
