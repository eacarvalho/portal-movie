(function () {
  'use strict';

  angular.module('portalMovie.movie').factory('MovieService', ['Api', MovieService]);

  function MovieService(Api) {

    var service = this;
    var $http = Api.movie;
    var size = 1000;

    service.listMovie = function () {
      return $http.get('/movies?type=Movie&sort=title&size=' + size);
    };

    service.listSerie = function () {
      return $http.get('/movies?type=Series&sort=title&size=' + size);
    };

    service.listByTitle = function (title) {
      return $http.get('/movies?title=' + title);
    };

    service.listByOriginalTitle = function (originalTitle) {
      return $http.get('/movies?originalTitle=' + originalTitle);
    };

    service.getByCode = function (code) {
      return $http.get('/movies/' + code);
    };

    service.save = function (movie) {
      return $http.post('/movies', movie)
        .success(function (data) {
          return data;
        });
    };

    return {
      listMovie: service.listMovie,
      listByTitle: service.listByTitle,
      listByOriginalTitle: service.listByOriginalTitle,
      getByCode: service.getByCode,
      listSerie: service.listSerie,
      save: service.save
    };
  }
})();