(function (amMoment) {
  'use strict';

  angular.module('portalMovie')
    .factory('ConverterUtils', function () {

      var byteArrayToString = function (uintArray) {
        var dataView = new DataView(uintArray);
        var decoder = new TextDecoder('utf-8');
        var decodedString = decoder.decode(dataView);
        return decodedString;
      };

      var stringToMoment = function (data, formato) {
        return amMoment(data, formato);
      };

      var convertToExcelFile = function (response) {
        return new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
      };

      var convertToFile = function (response) {
        return new Blob([response], {type: 'application/octet-stream;charset=UTF-8'});
      };

      return {
        byteArrayToString: byteArrayToString,
        moment: amMoment,
        convertToExcelFile: convertToExcelFile,
        convertToFile: convertToFile,
        stringToMoment: stringToMoment
      };
    });
})(window.moment);