(function () {
  'use strict';

  angular
    .module('portalMovie')
    .directive('zoom2', function() {
      return {
        restrict: 'AC',
        scope: {
                tiny: '=',
                small: '=',
                big: '=',
                title: '='
        },

        controller: ['$scope', '$attrs', '$element', '$compile',
            function($scope, $attrs, $element, $compile) {
              $scope.init = function() {
                $scope.$watch('tiny + small + big + title', function() {
                  var str = '<a href="' + $scope.big + '" class="cloud-zoom" rel="adjustX: 80, adjustY:-0"><img src="' + $scope.small + '" width="150" height="150"/></a>';

                  var e = $compile(str)($scope);
                  $element.html(e);
                  $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
                }, true);

              };
              $scope.init();
          }
        ]

    };
    });
})();
