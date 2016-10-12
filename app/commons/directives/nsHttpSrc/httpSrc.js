(function () {
  'use strict';

  angular
    .module('portalMovie')
    .directive('nsHttpSrc', [ '$http', NsHttpSrc]);

    function NsHttpSrc($http) {

      return {
        restrict: 'A',
        link : function (scope, element, attrs) {

          var config = {
            method: 'GET',
            url: attrs.nsHttpSrc,
            responseType: 'arraybuffer',
            cache: 'true',
            headers : {
              'X-Requested-NS-WS' : '*'
            }
          };

          $http(config)
            .then(function(response) {
              if(response.status === 200){
                var dataArray = new Uint8Array(response.data);
                var contentType = getContentType(response.headers());
                var rawData = '';
                var subDataArray;
                //Para evitar stackoverflow
                var chunkArray = 5000;

                for (var i = 0, subIndex = dataArray.length; i < subIndex; i += chunkArray) {
                  subDataArray = dataArray.subarray(i, i + chunkArray);
                  rawData += String.fromCharCode.apply(null, subDataArray);
                }

                var imageb64 = btoa(rawData);

                attrs.$set('src', 'data:' + contentType + ';base64,' + imageb64);
              }
            });

          var getContentType = function(headers){
            var contentTypes = headers['content-type'];
            var contentType;

            if(contentTypes){
              contentTypes = contentTypes.split(';');
              //retorna o primeiro item da lista que é o image/jpeg ou image/png
              contentType = contentTypes[0];
            }

            return contentType;
          };
        }
      };
    }
})();
