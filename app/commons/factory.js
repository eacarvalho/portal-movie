(function () {
    'use strict';

    angular.module('portalMovie')
        .factory('Factory', function (ENV) {
            return {
                PAIS_GLOBAL: {'id': 'BRA', 'nome': 'Brasil', 'ddi': 55, 'sigla': 'BR'},

                ESTADOS_GLOBAL: [
                    {'chave': 1, 'valor': 'AC'},
                    {'chave': 2, 'valor': 'AL'},
                    {'chave': 3, 'valor': 'AP'},
                    {'chave': 4, 'valor': 'AM'},
                    {'chave': 5, 'valor': 'BA'},
                    {'chave': 6, 'valor': 'CE'},
                    {'chave': 7, 'valor': 'DF'},
                    {'chave': 8, 'valor': 'ES'},
                    {'chave': 9, 'valor': 'GO'},
                    {'chave': 10, 'valor': 'MA'},
                    {'chave': 11, 'valor': 'MT'},
                    {'chave': 12, 'valor': 'MS'},
                    {'chave': 13, 'valor': 'MG'},
                    {'chave': 14, 'valor': 'PA'},
                    {'chave': 15, 'valor': 'PB'},
                    {'chave': 16, 'valor': 'PR'},
                    {'chave': 17, 'valor': 'PE'},
                    {'chave': 18, 'valor': 'PI'},
                    {'chave': 19, 'valor': 'RJ'},
                    {'chave': 20, 'valor': 'RN'},
                    {'chave': 21, 'valor': 'RS'},
                    {'chave': 22, 'valor': 'RO'},
                    {'chave': 23, 'valor': 'RR'},
                    {'chave': 24, 'valor': 'SC'},
                    {'chave': 25, 'valor': 'SP'},
                    {'chave': 26, 'valor': 'SE'},
                    {'chave': 27, 'valor': 'TO'}
                ],

                MOVIE_BASE: ENV.movieApi,

                getApiMovie: function (path) {
                    return this.MOVIE_BASE + path;
                },

                PAGINATION_PAGE_SIZE: 10,

                moeda: 'BRL'
            };
        });
})();