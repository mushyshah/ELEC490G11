'use strict';

// directive function sunburst
angular.module('mean.demovis').directive('radar1', function() {
  // directive function sunburst
  console.log("\n\nWTF IS HAPPEINING DIRECTIVE\n\n");
    return {
      restrict: "E",
      scope: {
        csv: "=",
        config: "="
      },
      link: radarDraw
    };
  });


// directive function onReadFile
angular.module('mean.demovis').directive('onReadFile', function() {
    return {
      restrict: "A",
      scope: false,
      link: function(scope, element, attrs) {
        var fn = $parse(attrs.onReadFile);
        element.on("change", function(onChangeEvent) {
          var reader = new FileReader();
          reader.onload = function(onLoadEvent) {
            scope.$apply(function() {
              fn(scope, {
                $fileContent: onLoadEvent.target.result
              });
            });
          };
          reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
        });
      }
    };
});