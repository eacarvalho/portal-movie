(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('navbarSearch', ['$timeout', function() {
      return {
        restrict: 'A',
        templateUrl: 'tpl/navbar-search.html',
        link: function(scope) {
          scope.showNavbarSearch = false;

          scope.toggleSearch = function(){
            scope.showNavbarSearch = !scope.showNavbarSearch;
          };

          scope.submitNavbarSearch = function(){
            scope.showNavbarSearch = false;
          };
        }
      };
    }]);
})();
