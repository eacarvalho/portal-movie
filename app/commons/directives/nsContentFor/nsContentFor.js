(function () {
	'use strict';

angular
  .module('portalMovie')
  .directive('contentFor', function() {
    return {
      scope: { 'for': '@' },
      restrict: 'E',
      transclude: true,

      controller: function($scope, $transclude, CONTENT_FOR_IDS) {
        CONTENT_FOR_IDS[$scope['for']] = $transclude();
        $scope.$on('$destroy',function() {
          delete CONTENT_FOR_IDS[$scope['for']];
        });
      }
    };
  })
  .directive('yield', function(CONTENT_FOR_IDS) {
    return {
      scope: { to: '@' },
      restrict: 'E',

      link: function(scope, elem) {
        var watchFn = function() { return CONTENT_FOR_IDS[scope.to]; };

        scope.$watch(watchFn, function(newValue) {
          if (!newValue) {
            elem.empty();
            return;
          }

          elem.empty();
          elem.append(newValue);
        });
      }
    };
  })
  .value('CONTENT_FOR_IDS', { });

}());

