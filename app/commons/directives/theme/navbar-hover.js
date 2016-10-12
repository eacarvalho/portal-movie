(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('navbarScroll', function($window) {
      return {
        restrict: 'A',
        link: function() {
          var navbar = angular.element('.main-container .navbar');
          angular.element($window).bind('scroll', function() {
            if (this.pageYOffset > 0) {
              navbar.addClass('scroll');
            } else {
              navbar.removeClass('scroll');
            }
          });
        }
      };
    });
})();
