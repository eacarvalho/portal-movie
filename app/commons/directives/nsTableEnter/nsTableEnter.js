(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('nsTableEnter', function () {
      return {
        restrict: 'A',
        require: '^nsTableAction',
        scope: {
          row: '@',
          '$index': '@'
        },
        link: function (scope, element, attrs, ctrl) {
          element.on('keypress keydown', function (event) {
            if (event.keyCode === 13) {
              ctrl.actions.edit();
              scope.$apply();
            }

            if (event.keyCode === 27) {
              ctrl.actions.cancel();
              scope.$apply();
            }
          });
        }
      };
    });
})();

