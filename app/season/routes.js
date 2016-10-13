'use strict';

angular.module('portalMovie.season',['ngRoute',
    'smart-table',
    'ui.select'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/season/list', {
            templateUrl: 'season/list.html',
            controller: 'SeasonCtrl',
            controllerAs: 'ctrl'
        });
    }]);