(function () {
    'use strict';

    angular
        .module('portalMovie.movie')
        .controller('MovieCtrl', ['$scope', '$http', 'Factory', 'MovieService', MovieCtrl]);

    function MovieCtrl($scope, $http, Factory, MovieService) {

        var ctrl = this;
        ctrl.alerts = [];

        //  PAGINATION SETUP
        var primeiraPagina = 1;
        ctrl.maxSize = 5;
        ctrl.totalItems = 0;
        ctrl.paginaAtual = 1;
        ctrl.pageSize = Factory.PAGINATION_PAGE_SIZE;
        ctrl.pageChanged = pageChanged;

        ctrl.moviesCombo = [];
        ctrl.movies = [];
        ctrl.movie = {};
        ctrl.movie.selected = {};

        ctrl.list = list;
        ctrl.getByCode = getByCode;

        init();

        var message = function (msg, typeAlert) {
            ctrl.alerts.push({type: typeAlert, msg: msg});
            if (typeAlert === 'danger') {
                Utils.scrollToTop();
            }
        };

        function closeMessage(index) {
            ctrl.alerts.splice(index);
        }

        function list() {
            MovieService.list()
                .success(function (response, status) {
                    if (response) {
                        ctrl.totalItems = response.totalElements;
                        ctrl.moviesCombo = [];
                        ctrl.movie.selected = {};

                        angular.forEach(response.content, function (movie) {
                            setMovie(movie);
                            ctrl.moviesCombo.push(ctrl.movie);
                        });

                        ctrl.movies = ctrl.moviesCombo;
                    }
                }).error(function (response, status) {
                    console.log('Request falhou ' + response + ', status code: ' + status);
                });
        }

        function getByCode(code) {
            if (code === undefined) {
                list();
            } else {
                MovieService.getByCode(code)
                    .success(function (response, status) {
                        if (response) {
                            ctrl.totalItems = 1;
                            ctrl.movies = [];
                            ctrl.movie.selected = {};

                            setMovie(response);
                            ctrl.movies.push(ctrl.movie);
                            ctrl.movie.selected = ctrl.movie;
                        }
                    }).error(function (response, status) {
                        console.log('Request falhou ' + response + ', status code: ' + status);
                    });
            }
        }

        function setMovie(movie) {
            ctrl.movie = {
                code: movie.code,
                title: movie.title,
                originalTitle: movie.originalTitle,
                duration: movie.duration,
                type: movie.type,
                genres: movie.genres,
                releasedDate: movie.releasedDate,
                year: movie.year,
                plot: movie.plot,
                director: movie.director,
                rating: movie.rating,
                imdbRating: movie.imdbRating,
                imdbID: movie.imdbID,
                poster: movie.poster
            };
        }

        function pageChanged(number) {
            ctrl.paginaAtual = number || ctrl.paginaAtual;
            // buscar();
        }

        function init() {
            list();
        }
    }
})();