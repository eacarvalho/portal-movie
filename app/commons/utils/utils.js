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

      var convertToArray = function (str) {
        var ret = [];

        if (str === undefined || str === '') {
          return [];
        }

        var props = '';
        props = str.split(',');

        if (props.length === 0) {
          ret.push(str.trim());
          return ret;
        }

        for (var i = 0; i < props.length; i++) {
          ret.push(props[i].trim());
        }

        return ret;
      };

      return {
        scrollTo: scrollTo,
        scrollToTop: scrollToTop,
        convertToArray: convertToArray
      };
    });
})();