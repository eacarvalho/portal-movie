'use strict';

angular.module('portalMovie.serie',['ngRoute',
    'smart-table',
    'ui.select'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/serie/list', {
            templateUrl: 'serie/list.html',
            controller: 'SerieCtrl',
            controllerAs: 'ctrl'
        }).when('/serie/create', {
            templateUrl: 'serie/create.html',
            controller: 'SerieCtrl',
            controllerAs: 'ctrl'
        });
    }]);