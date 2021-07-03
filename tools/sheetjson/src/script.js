(function() {
  var app = angular.module('app', []);

  app.controller('controller', function($scope, $http) {

    // Default URL
    $scope.inputURL = "https://docs.google.com/spreadsheets/d/1I3tEfgYtWKNYK9vqTmsCGfZfbHckS0-odDIgEilHiOQ/edit#gid=471572974";

    // Convert the URL function
    $scope.getGoogleJSON = function(url) {

        // Clear newURL
        $scope.newURL = '';

        // Empty array for all the original grid IDs
        $scope.oldGrids = [];
        // Empty array for all the new grid IDs
        $scope.newGrids = [];

        // Get the spreadsheet ID from the URL
        var id;
        var preString = url.substring(url.indexOf('/d/') + 3);
        if (preString.indexOf('/') > -1) {
          id = preString.substring(0, preString.indexOf('/'));
        } else {
          id = preString;
        }

        // Get the grid ID from the URL
        var grid = url.substring(url.indexOf('=') + 1);

        // Get XML data of the spreadhseet which includes the new IDs. Using cors.io to avoid cross origin errors. This is for when a spreadsheet has multiple sheets
        $http.get('https://cors.io/?https://spreadsheets.google.com/feeds/worksheets/' + id + '/public/full').then(function(response) {

            // Parse the response as xml
            var xml = $($.parseXML(response.data));
          
            // Find each entry and loop through
            $(xml).find('entry').each(function() {
                // Get each old grid ID from XML data - contained in a '<link>'
              
                var oldGridSrc = $(this).children('link[rel="http://schemas.google.com/visualization/2008#visualizationApi"]').attr('href');
              
                // Chop the ID from the end of the href
                var oldGrid = oldGridSrc.substring(oldGridSrc.indexOf('=') + 1, oldGridSrc.indexOf('&'))

                // Find the '<id>' element in the xml. This contains the new Grid ID
                var newGridSrc = $(this).children('id').text();
                // Chop the ID from the end of the string
                var newGrid = newGridSrc.substring(newGridSrc.lastIndexOf('/') + 1);

                // Push new Grid ID to array
                $scope.newGrids.push(newGrid);
                // Push old Grid ID to array
                $scope.oldGrids.push(oldGrid);

              }) // End Each

            // Get new Grid ID by cross referencing the original grid ID in the oldGrids array, return the index, and use that index to get the new Grid ID from the newGrids array. If undefined set to '1' which is the default for the first sheet
            $scope.newGridID = $scope.newGrids[$scope.oldGrids.indexOf(grid)] || '1';

            // Compose new URL
            $scope.newURL = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + $scope.newGridID + '/public/values?alt=json';

            // Get JSON Response
            $http.get($scope.newURL).then(function(response) {
              $scope.JSONData = response.data;
            });

            // Show first tab
            $('.nav-tabs a:first').tab('show');

            setTimeout(function() {
              $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
              });
            }, 500);
          }, function(response){
            $scope.error = "Sorry, there has been an error. Please check your Spreadsheet URL";
        }) // End $http.get

      } // End getGoogleJSON function

  }); // End Controller

})();