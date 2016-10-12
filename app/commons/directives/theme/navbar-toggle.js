(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('navbarToggle', function() {
      return {
        restrict: 'C',
        link: function(scope, element) {
          element.sideNav({ menuWidth: 260, closeOnClick: true });
        }
      };
    });
})();
