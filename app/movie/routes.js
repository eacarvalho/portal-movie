'use strict';

angular.module('portalMovie.movie', ['ngRoute',
    'smart-table',
    'ui.select'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movie/list', {
            templateUrl: 'movie/list.html',
            controller: 'MovieCtrl',
            controllerAs: 'ctrl'
        });
    }]);