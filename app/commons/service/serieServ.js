(function () {
    'use strict';

    angular.module('portalMovie.serie').factory('SerieService', ['Api', SerieService]);

    function SerieService(Api) {

        var service = this;
        var $http = Api.movie;
        var size = 1000;

        service.list = function () {
            return $http.get('/series?size=' + size + '&expand=false');
        };

        service.listByTitle = function (title) {
            return $http.get('/series/' + title);
        };

        service.getByTitleAndSeason = function (title, season) {
            return $http.get('/series/' + title + '/seasons/' + season);
        };

        return {
            list : service.list,
            listByTitle : service.listByTitle,
            getByTitleAndSeason : service.getByTitleAndSeason
        };
    }
})();