(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('initRipples', function() {
      return {
        restrict: 'A',
        link: function(scope, element) {
          var withRipples = [
            '.btn:not(.withoutripple)',
            '.card-image',
            '.navbar a:not(.withoutripple)',
            '.dropdown-menu a',
            '.nav-tabs a:not(.withoutripple)',
            '.withripple'
          ].join(',');

          $(element).find(withRipples).ripples();
        }
      };
    });
})();
