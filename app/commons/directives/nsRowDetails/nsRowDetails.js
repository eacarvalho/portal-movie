(function() {
  'use strict';
  angular
    .module('portalMovie')
    .directive('nsRowDetails', function($compile) {
      return {
        restrict: 'A',
        scope: {
          detailsData: '=nsRowDetails',
          ctrl: '=nsCtrl'
        },
        link: function(scope, element, attrs) {
          var css = element.attr('class');
          css = css + ' hand-pointer';
          element.attr('class', css);
          var elementTrigger = element;
          var elementSelector = element.selector;
          var content = '';

          if (attrs.nsRowDetailTrigger) {
            elementTrigger = element.closest('table');
            elementSelector = attrs.nsRowDetailTrigger;
          }

          if (!scope.detailsData) {
            throw 'detailsData undefined';
          }

          if (!attrs.nsRowDetailsTemplate) {
            throw 'nsRowDetailsTemplate undefined';
          }

          $.get(attrs.nsRowDetailsTemplate).success(function(data) {
            content = data;

            element.after($compile(
              '<tr style=\"background-color: #fff!important;">' +
              '  <td colspan="' + element.children().length +
              '" style="padding: 0px!important;">' +
              '    <div class="container-fluid" ng-if="detailsData.$detailsOpen" style="padding: 0px !important; white-space: normal !Important;">' +
              content +
              '    </div>' +
              '  </td>' +
              '</tr>')(scope));
          });
          

          elementTrigger.on('click', elementSelector, function() {   
            scope.detailsData.$detailsOpen = !scope.detailsData.$detailsOpen;
            scope.$apply();
          });
        }
      };
    });
})();
