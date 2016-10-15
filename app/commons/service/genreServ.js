(function () {
  'use strict';

  angular.module('portalMovie.movie').factory('GenreService', ['Api', GenreService]);

  function GenreService(Api) {

    var service = this;
    var $http = Api.movie;

    service.list = function () {
      return $http.get('/genres');
    };

    return {
      list: service.list
    };
  }
})();