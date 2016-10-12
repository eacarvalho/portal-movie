(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('menuToggle', ['$location', function($location) {
      return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
          name: '@',
          icon: '@'
        },
        templateUrl: 'commons/directives/theme/tpl/menu-toggle.html',
        link: function(scope, element, attrs) {
          var icon = attrs.icon;
          if ( icon ) {
            element.children().first().prepend('<i class="' + icon + '"></i>&nbsp;');
          }

          element.children().first().on('click', function(e) {
            e.preventDefault();
            var link = angular.element(e.currentTarget);

            if( link.hasClass('active') ) {
              link.removeClass('active');
            } else {
              link.addClass('active');
            }
          });

          element.find('a').ripples();

          scope.isOpen = function() {
            var folder = '/' + $location.path().split('/')[1];
            return folder === attrs.path;
          };
        }
      };
    }]);
})();
