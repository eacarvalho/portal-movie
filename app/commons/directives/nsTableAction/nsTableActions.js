(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('nsTableAction', function ($compile) {
      var ctrl = ['$scope', function ($scope) {
        var rows = {};

        $scope.startEdit = function () {
          var willEdit = true;

          if (angular.isFunction($scope.nsBeforeEdit)) {
            willEdit = $scope.nsBeforeEdit.apply(null, [$scope.row]);
          }

          if (willEdit) {
            $scope.row.$edit = willEdit;
            rows[$scope.$index] = angular.copy($scope.row);
          }
        };

        $scope.cancel = function () {
          var oldRow = rows[$scope.$index];
          if (angular.isFunction($scope.nsCancel)) {
            var rowModified = angular.copy($scope.row);
            $scope.nsCancel.apply(null, [rowModified, oldRow]);
          }
          angular.copy(oldRow, $scope.row);
          $scope.row.$edit = false;
        };

        $scope.edit = function () {
          var keepEditing = false;

          if (angular.isFunction($scope.nsSave)) {
            var rowModified = angular.copy($scope.row);
            angular.copy(rows[$scope.$index], $scope.row);
            keepEditing = $scope.nsSave.apply(null, [rowModified, $scope.row]);
          }

          $scope.row.$edit = keepEditing === undefined ? false : !keepEditing;
        };

        this.actions = {
          edit: $scope.edit,
          cancel: $scope.cancel
        };
      }];

      return {
        restrict: 'A',
        controller: ctrl,
        replace: false,
        scope: {
          row: '=nsRow',
          nsSave: '=nsSave',
          nsCancel: '=nsCancel',
          nsBeforeEdit: '=nsBeforeEdit',
          nsPreventNewColumn: '=nsPreventNewColumn',
          '$index': '=nsIndex'
        },
        link: function (scope, element) {
          var tdOpen = '';
          var tdClose = '';
          if (!scope.nsPreventNewColumn){
            tdOpen = '<td class="table-actions" >';
            tdClose = '</td>';
          }

          var td =
            tdOpen +
            '  <button type="button" ng-if="!row.$edit" href="" class="btn btn-info btn-xs row-edit" ng-click="startEdit(row,$index)">' +
            '    <i class="glyphicon glyphicon-pencil"></i>' +
            '  </button>' +
            '  <button type="button" ng-if="row.$edit" href="" class="btn btn-success btn-xs row-save" ng-click="edit(row, $index)">' +
            '    <i class="glyphicon glyphicon-ok"></i>' +
            '  </button>' +
            '  <button type="button" ng-if="row.$edit" href="" class="btn btn-danger btn-xs row-cancel" ng-click="cancel(row)">' +
            '    <i class="glyphicon glyphicon-remove"></i>' +
            '  </button>' +
            tdClose;

          if (scope.nsPreventNewColumn){
            element.find('td:last').addClass('table-actions').append($compile(td)(scope));
          } else {
            element.find('td:last').after($compile(td)(scope));
          }
        }
      };
    });
})();

