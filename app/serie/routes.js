'use strict';

angular.module('portalMovie.serie', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/serie/list', {
            templateUrl: 'serie/list.html',
            controller: 'SerieCtrl',
            controllerAs: 'ctrl'
        });
    }]);