'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Surveys = new Module('surveys');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Surveys.register(function(app, auth, database) {

  app.set('views', __dirname + '/server/views');

  //We enable routing. By default the Package Object is passed to the routes
  Surveys.routes(app, auth, database);

  console.log('\n\nWOKR OWKR WORK OWORK \n\n');
  //We are adding a link to the main menu for all authenticated users
  Surveys.menus.add({
    title: 'surveys example page',
    link: 'surveys example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Surveys.aggregateAsset('css', 'surveys.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Surveys.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Surveys.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Surveys.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Surveys;
});
