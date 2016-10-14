(function () {
  'use strict';

  angular.module('portalMovie')
    .factory('Utils', function ($location, $anchorScroll) {

      function scrollTo(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
      }

      function scrollToTop() {
        scrollTo('top');
      }

      return {
        scrollTo: scrollTo,
        scrollToTop: scrollToTop
      };
    });
})();