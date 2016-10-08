'use strict';

angular.module('config', [])

    .constant('ENV', {
        name: 'development',
        movieApi: 'http://localhost:8080'
    })
;