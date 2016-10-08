'use strict';

angular.module('config', [])

    .constant('ENV', {
        name: 'development',
        movieApi: 'http://api.movie.iworks.com.br'
    })
;