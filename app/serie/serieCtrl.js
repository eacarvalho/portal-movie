(function () {
  'use strict';

  angular
    .module('portalMovie.serie')
    .controller('SerieCtrl', ['$scope', '$http', '$filter', 'Utils', 'Factory', 'MovieService', 'OmdbService', 'GenreService', SerieCtrl]);

  function SerieCtrl($scope, $http, $filter, Utils, Factory, MovieService, OmdbService, GenreService) {

    var ctrl = this;
    ctrl.alerts = [];

    ctrl.moviesCombo = [];
    ctrl.movies = [];
    ctrl.movie = {};
    ctrl.movieSelected = {};
    ctrl.genres = [];

    ctrl.listSerie = listSerie;
    ctrl.listByTitle = listByTitle;
    ctrl.listByOriginalTitle = listByOriginalTitle;
    ctrl.getByCode = getByCode;
    ctrl.save = save;
    ctrl.reset = reset;

    ctrl.listByOmdb = listByOmdb;
    ctrl.listGenres = listGenres;

    ctrl.showCard = false;

    init();

    var message = function (msg, typeAlert) {
      ctrl.alerts.push({type: typeAlert, msg: msg});
      Utils.scrollToTop();
    };

    function closeMessage(index) {
      ctrl.alerts.splice(index);
    }

    function listSerie() {
      MovieService.listSerie()
        .success(function (response, status) {
          if (response) {
            ctrl.moviesCombo = [];
            ctrl.movies = [];
            ctrl.movieSelected = {};

            setMovieList(response);

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
              ctrl.movieSelected = {};

              setMovie(response);
              ctrl.movies.push(ctrl.movie);
              ctrl.movieSelected = ctrl.movie;
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
              setMovieList(response);
            }
          }).error(function (response, status) {
            console.log('Request falhou ' + response + ', status code: ' + status);
          });
      }
    }

    function listByOriginalTitle(originalTitle) {
      MovieService.listByOriginalTitle(originalTitle)
        .success(function (response, status) {
          if (response) {
            setMovieList(response);
          }
        }).error(function (response, status) {
          console.log('Request falhou ' + response + ', status code: ' + status);
        });
    }

    function setMovieList(response) {
      ctrl.totalItems = response.totalElements;
      ctrl.movies = [];
      ctrl.movieSelected = {};

      angular.forEach(response.content, function (movie) {
        setMovie(movie);
        ctrl.movies.push(ctrl.movie);
      });

      ctrl.movieSelected = ctrl.movie;
      ctrl.movie = {};
    }

    function setMovieListByOmdb(response) {
      ctrl.totalItems = 1;
      ctrl.movies = [];
      ctrl.movieSelected = {};

      setMovieByOmdb(response);
      ctrl.movies.push(ctrl.movie);

      ctrl.movieSelected = ctrl.movie;
    }

    function save(movie) {
      ctrl.alerts = [];

      if (movie !== undefined) {
        MovieService.save(movie)
          .success(function (response) {
            if (response) {
              setMovie(response);
              ctrl.showCard = true;
              message('Serie saved with success', 'info');
            }
          }).error(function (response, status) {
            console.log('Request falhou ' + response + ', status code: ' + status);
            ctrl.showCard = false;

            if (status === 409) {
              message('Serie has already registered', 'warning');
            } else if (response && response.errors && response.errors.length > 0) {
              message(response.errors[0], 'danger');
            } else {
              message('Error saving serie', 'danger');
            }
          });
      } else {
        message('Serie cannot be null', 'danger');
      }
    }

    function listByOmdb(originalTitle) {
      ctrl.alerts = [];
      ctrl.showCard = false;

      if (originalTitle && originalTitle !== '' && originalTitle !== undefined) {
        OmdbService.listByOriginalTitle(originalTitle)
          .success(function (response, status) {
            if (response) {
              setMovieListByOmdb(response);
              ctrl.showCard = true;
              console.log(ctrl.movie);
            } else {
              ctrl.movie = {};
              ctrl.movie.originalTitle = originalTitle;
              message('Not found any serie with the given title', 'warning');
            }
          }).error(function (response, status) {
            console.log('Request falhou ' + response + ', status code: ' + status);
            message('Not found any serie with the given title', 'warning');
          });
      }
    }

    function listGenres() {
      GenreService.list()
        .success(function (response, status) {
          if (response) {
            ctrl.genres = [];
            angular.forEach(response, function (genre) {
              ctrl.genres.push(genre);
            });
          }
        }).error(function (response, status) {
          console.log('Request falhou ' + response + ', status code: ' + status);
        });
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

    function setMovieByOmdb(movieOmdb) {
      var genres = Utils.convertToArray(movieOmdb.Genre);
      var date = $filter('date')(new Date(movieOmdb.Released), 'yyyy-MM-dd');

      ctrl.movie = {
        title: movieOmdb.Title,
        originalTitle: movieOmdb.Title,
        duration: movieOmdb.Runtime,
        type: movieOmdb.Type,
        releasedDate: date,
        year: movieOmdb.Year,
        plot: movieOmdb.Plot,
        director: movieOmdb.Director,
        rating: movieOmdb.rating,
        imdbRating: movieOmdb.imdbRating,
        imdbID: movieOmdb.imdbID,
        poster: movieOmdb.Poster
      };
    }

    function reset() {
      ctrl.alerts = [];
      ctrl.totalItems = 0;
      ctrl.movie = {};
      ctrl.movies = [];
      ctrl.movieSelected = {};
      ctrl.showCard = false;
    }

    function init() {
      reset();
      listGenres();
      listSerie();
    }
  }
})();