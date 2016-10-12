(function () {
  'use strict';

  angular
    .module('portalMovie')
    .directive('nsPopover', function() {
      return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;
            $(el).popover({
                trigger: 'click',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
    });
})();
