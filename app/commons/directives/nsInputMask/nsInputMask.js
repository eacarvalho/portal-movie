(function () {
  'use strict';

  angular
    .module('portalMovie')
    .directive('nsInputMask', function () {
      return {
        restrict: 'A',
        link: function (scope, el, attrs) {
          $(el).inputmask(scope.$eval(attrs.nsInputMask));
        }
      };
    });
})();
