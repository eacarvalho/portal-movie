(function () {
  'use strict';

  angular
    .module('portalMovie')
    .directive('resizeColumn', function() {
      return {
        restrict : 'A',
        link : function(scope, element) {
          element.resizableColumns();
          }
      };
    });
})();
