(function() {
  'use strict';
  angular.module('portalMovie')
  .directive('nsMaskMoney', function($timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, el, attr, ctrl) {

        scope.$watch(attr.ngModel, eventHandler, true);
        el.on('keyup', eventHandler); //change to $watch or $observe
        init();


        //this parser will unformat the string for the model behid the scenes
        function parser() {
          return $(el).maskMoney('unmasked')[0];
        }

        ctrl.$formatters.push(function(value){
          $timeout(function(){
            init();
          });
          return parseFloat(value).toFixed(2);
        });

        ctrl.$parsers.push(parser);
        
        function eventHandler() {
          $timeout(function() {
            scope.$apply(function() {
              ctrl.$setViewValue($(el).val());
            });
          });
        }

        function init() {
          $timeout(function() {
            el.maskMoney(scope.$eval(attr.nsMaskMoney));
            el.maskMoney('mask');

            $timeout(function() {
              scope.$apply(function() {
                ctrl.$setViewValue($(el).val());
              });
            });
          });
        }
      }
    };
  }); 
})();

