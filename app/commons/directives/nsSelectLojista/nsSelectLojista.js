(function() {
  'use strict';
  angular
    .module('portalMovie')
    .directive('nsSelectLojista', function() {
      var ctrl = ['$scope', 'FornecedorService', 'SegurancaUsuario','orderByFilter', '$attrs', function ($scope, FornecedorService, SegurancaUsuario, orderByFilter, $attrs) {

        FornecedorService.buscarLojistas(SegurancaUsuario.getCnpj()).then(
            function(response) {
              $scope.lojistas = response;
              if ($scope.lojistas.length >= 1) {
                $scope.lojistas = orderByFilter($scope.lojistas, 'nome');
                if($attrs.nsNotSelect === undefined){
                   $scope.$eval($attrs.nsModel + '=' + angular.toJson($scope.lojistas[0]));
                }
                
                if ($attrs.nsModelLojistas) {
                  $scope.$eval($attrs.nsModelLojistas + '=' + angular.toJson($scope.lojistas));
                }

                $scope.$eval($attrs.nsOnSuccess);                
              }
            },        
            function() {
              $scope.$eval($attrs.nsOnError);
            }
        );
        
      }];
      return {
        restrict: 'E',
        controller: ctrl,
        scope: false,
        template: function(elem, attrs) {
        	return '<ui-select ng-model="'+ attrs.nsModel +'" theme="bootstrap" id="filtroLojista" ng-change="'+ attrs.nsOnChange +'" ng-disabled="'+ attrs.nsDisabled +'">' +
                     '<ui-select-match allow-clear="'+ attrs.nsAllowClear +'" placeholder="{{\'error.msg.selecione.lojista\' | translate}}">{{'+ attrs.nsModel +'.nome}}</ui-select-match>' +
                     '<ui-select-choices repeat="lojista in lojistas | filter: $select.search track by lojista.id" >' +
                       '<span ng-bind-html="lojista.nome | highlight: $select.search"/>' +
                     '</ui-select-choices>' +
                   '</ui-select>';
        }
      };
    });
})();
