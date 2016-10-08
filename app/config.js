'use strict';

angular.module('config', [])

    .constant('ENV', {
        name: 'development',
        movieApi: 'http://movie.iworks.com.br'
    })
;