(function () {
  'use strict';
  angular
    .module('portalMovie')
    .directive('datePicker', ['ConverterUtils', function (ConverterUtils) {

      var formatoData = 'DD-MM-YYYY';

      var directive = {
        require: 'ngModel',
        scope: {
          datePickerOptions: '=datePicker'
        },
        link: function (scope, element, attrs, ngModelCtrl) {
          $(function () {
            var defaults = {
              changeYear: true,
              changeMonth: true,
              dateFormat: 'dd-mm-yy 00:00',
              yearRange: '2015:2200',
              minDate: attrs.minDate,
              maxDate: attrs.maxDate,
              maxDayRange: attrs.maxDayRange,
              onSelect: function (dateText) {
                ngModelCtrl.$setViewValue(dateText);
                scope.$apply();
              },
              onClose: function (dateText) {
                if (options.dataMaxId) {
                  var elemDataMaxId = $('#' + options.dataMaxId);

                  elemDataMaxId.datepicker('option', 'minDate', dateText);

                  if (options.maxDayRange && options.maxDayRange !== '') {
                    var maxDateRange = ConverterUtils.stringToMoment(dateText, formatoData).add(options.maxDayRange, 'days').format(formatoData);
                    elemDataMaxId.datepicker('option', 'maxDate', maxDateRange);
                  }
                }

                if (options.dataMinId) {
                  var elemDataMinId = $('#' + options.dataMinId);

                  elemDataMinId.datepicker('option', 'maxDate', dateText);

                  if (options.maxDayRange && options.maxDayRange !== '') {
                    var minDateRange = ConverterUtils.stringToMoment(dateText, formatoData).subtract(options.maxDayRange, 'days').format(formatoData);
                    elemDataMinId.datepicker('option', 'minDate', minDateRange);
                  }
                }

                ngModelCtrl.$setViewValue(dateText);
                scope.$apply();
              }
            };

            var options = {};
            if (scope.datePickerOptions) {
              options = scope.datePickerOptions;
            }

            options = angular.extend({}, defaults, options);
            element.datepicker(options);

          });
        }
      };

      return directive;
    }]).directive('dateFilter', ['ConverterUtils', function (Utils) {
      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
          var formatoData = 'DD/MM/YYYY HH:mm';
          ngModelController.$parsers.push(function (data) {
            data = Utils.stringToMoment(data, formatoData);
            return data;
          });

          ngModelController.$formatters.push(function (data) {
            data = Utils.stringToMoment(data).format(formatoData);
            return data;
          });
        }
      };
    }]);
})();