(function () {
    'use strict';

    angular.module('portalMovie.movie').factory('MovieService', ['Api', MovieService]);

    function MovieService(Api) {

        var service = this;
        var $http = Api.movie;
        var size = 1000;

        service.listMovie = function () {
            return $http.get('/movies?type=Movie&size=' + size);
        };

        service.listSerie = function () {
            return $http.get('/movies?type=Serie&size=' + size);
        };

        service.listByTitle = function (title) {
            return $http.get('/movies?title=' + title);
        };

        service.getByCode = function (code) {
            return $http.get('/movies/' + code);
        };

        return {
            listMovie : service.listMovie,
            listByTitle : service.listByTitle,
            getByCode : service.getByCode,
            listSerie : service.listSerie
        };
    }
})();