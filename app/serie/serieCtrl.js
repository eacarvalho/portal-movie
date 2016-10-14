(function () {
  'use strict';

  angular
    .module('portalMovie.serie')
    .controller('SerieCtrl', ['$scope', '$http', 'Factory', 'MovieService', SerieCtrl]);

  function SerieCtrl($scope, $http, Factory, MovieService) {

    var ctrl = this;
    ctrl.alerts = [];

    ctrl.moviesCombo = [];
    ctrl.movies = [];
    ctrl.movie = {};
    ctrl.movie.selected = {};
    ctrl.newMovie = {};

    ctrl.listSerie = listSerie;
    ctrl.listByTitle = listByTitle;
    ctrl.getByCode = getByCode;
    ctrl.save = save;

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

    function listSerie() {
      MovieService.listSerie()
        .success(function (response, status) {
          if (response) {
            ctrl.totalItems = response.totalElements;
            ctrl.moviesCombo = [];
            ctrl.movies = [];
            ctrl.movie.selected = {};

            angular.forEach(response.content, function (movie) {
              setMovie(movie);
              ctrl.movies.push(ctrl.movie);
            });

            ctrl.moviesCombo = ctrl.movies;
          }
        }).error(function (response, status) {
          console.log('Request falhou ' + response + ', status code: ' + status);
        });
    }

    function getByCode(code) {
      if (code === undefined) {
        listSerie();
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

    function listByTitle(title) {
      if (title === undefined || title === '') {
        listSerie();
      } else {
        MovieService.listByTitle(title)
          .success(function (response, status) {
            if (response) {
              ctrl.totalItems = 1;
              ctrl.movies = [];

              angular.forEach(response.content, function (movie) {
                setMovie(movie);
                ctrl.movies.push(ctrl.movie);
              });

              ctrl.movie.selected = ctrl.movie;
            }
          }).error(function (response, status) {
            console.log('Request falhou ' + response + ', status code: ' + status);
          });
      }
    }

    function save(movie) {
      if (movie !== undefined) {
        MovieService.save(movie)
          .success(function (response) {
            if (response) {
              message('Serie saved with success', 'info');
            }
          }).error(function (response, status) {
            console.log('Request falhou ' + response + ', status code: ' + status);

            if (status === 409) {
              message('Serie has already registered', 'warning');
            } else {
              message('Error saving serie: ' + response, 'danger');
            }
          });
      } else {
        message('Serie cannot be null', 'danger');
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

    function init() {
      listSerie();
    }
  }
})();