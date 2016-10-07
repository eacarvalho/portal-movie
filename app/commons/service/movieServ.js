(function () {
    'use strict';

    angular.module('portalMovie.movie').factory('MovieService', ['Api', MovieService]);

    function MovieService(Api) {

        var service = this;
        var $http = Api.movie;

        service.list = function () {
            return $http.get('/movies');
        };

        service.getByCode = function (code) {
            return $http.get('/movies/' + code);
        };

        return {
            list : service.list,
            getByCode : service.getByCode
        };
    }
})();