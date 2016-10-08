(function () {
    'use strict';

    angular.module('portalMovie')
        .factory('Factory', function (ENV) {
            return {
                MOVIE_BASE: ENV.movieApi,

                getApiMovie: function (path) {
                    return this.MOVIE_BASE + path;
                },

                PAGINATION_PAGE_SIZE: 10
            };
        });
})();