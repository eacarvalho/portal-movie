(function () {
  'use strict';

  angular
    .module('portalMovie.movie')
    .controller('MovieCtrl', ['$scope', '$http', 'Factory', 'MovieService', MovieCtrl]);

  function MovieCtrl($scope, $http, Factory, MovieService) {

    var ctrl = this;
    ctrl.alerts = [];

    ctrl.movies = [];
    ctrl.movie = {};
    ctrl.movie.selected = {};
    ctrl.movieTitle = '';

    ctrl.listMovie = listMovie;
    ctrl.listByTitle = listByTitle;
    ctrl.getByCode = getByCode;
    ctrl.rowSelected = rowSelected;

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

    function listMovie() {
      MovieService.listMovie()
        .success(function (response, status) {
          if (response) {
            ctrl.totalItems = response.totalElements;
            ctrl.movies = [];
            ctrl.movie.selected = {};

            angular.forEach(response.content, function (movie) {
              setMovie(movie);
              ctrl.movies.push(ctrl.movie);
              ctrl.movie.selected = ctrl.movies[0];
            });
          }
        }).error(function (response, status) {
          console.log('Request falhou ' + response + ', status code: ' + status);
        });
    }

    function getByCode(code) {
      if (code === undefined) {
        listMovie();
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
        list();
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

    function rowSelected(row) {
      if (row === undefined) {
        listMovie();
      } else {
        ctrl.movie.selected = row;
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
      listMovie();
    }
  }
})();