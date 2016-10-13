(function () {
    'use strict';

    angular.module('portalMovie.movie').factory('MovieService', ['Api', MovieService]);

    function MovieService(Api) {

        var service = this;
        var $http = Api.movie;
        var size = 1000;

        service.list = function () {
            return $http.get('/movies?size=' + size);
        };

        service.listByTitle = function (title) {
            return $http.get('/movies?title=' + title);
        };

        service.getByCode = function (code) {
            return $http.get('/movies/' + code);
        };

        return {
            list : service.list,
            listByTitle : service.listByTitle,
            getByCode : service.getByCode
        };
    }
})();