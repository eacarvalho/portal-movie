(function () {
  'use strict';

  angular.module('portalMovie.movie').factory('OmdbService', ['Api', OmdbService]);

  function OmdbService(Api) {

    var service = this;
    var $http = Api.movie;

    service.listByOriginalTitle = function (originalTitle) {
      return $http.get('/omdb-movies/' + originalTitle);
    };

    return {
      listByOriginalTitle: service.listByOriginalTitle
    };
  }
})();