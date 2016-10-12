(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('scrollSpy', ['$window',function($window) {
      return {
        link: function(scope) {
          angular.element($window).bind('scroll', function() {
            scope.scroll = this.pageYOffset;
            if(!scope.$$phase) {
              scope.$apply();
            }
          });
        }
      };
    }]);
})();
