(function () {
    'use strict';

    angular
        .module('portalMovie.serie')
        .controller('SerieCtrl', ['$scope', '$http', 'Factory', 'SerieService', SerieCtrl]);

    function SerieCtrl($scope, $http, Factory, SerieService) {

        var ctrl = this;
        ctrl.alerts = [];

        ctrl.seriesCombo = [];
        ctrl.serie = {};
        ctrl.serie.selected = {};

        ctrl.list = list;
        ctrl.getByTitleAndSeason = getByTitleAndSeason;
        ctrl.rowSelected = rowSelected;
        ctrl.showSerieDetails = showSerieDetails;

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

        function showSerieDetails() {
            return ctrl.serie.selected.title !== undefined;
        }

        function list() {
            SerieService.list()
                .success(function (response, status) {
                    if (response) {
                        ctrl.totalItems = response.totalElements;
                        ctrl.seriesCombo = [];
                        ctrl.serie.selected = {};

                        angular.forEach(response.content, function (serie) {
                            setSerie(serie);
                            ctrl.seriesCombo.push(ctrl.serie);
                        });
                    }
                }).error(function (response, status) {
                    console.log('Request falhou ' + response + ', status code: ' + status);
                });
        }

        function getByTitleAndSeason(title, season) {
            SerieService.getByTitleAndSeason(title, season)
                .success(function (response, status) {
                    if (response) {
                        ctrl.totalItems = 1;
                        ctrl.serie.selected = {};

                        setSerie(response);
                        ctrl.serie.selected = ctrl.serie;
                    }
                }).error(function (response, status) {
                    console.log('Request falhou ' + response + ', status code: ' + status);
                });
        }

        function rowSelected(row) {
            console.log(ctrl.serie);
            console.log(row);
        }

        function setSerie(serie) {
            ctrl.serie = {
                title: serie.title,
                season: serie.season,
                totalSeasons: serie.totalSeasons,
                rating: serie.rating,
                episodes: serie.episodes
            };
        }

        function init() {
            ctrl.serie.selected = {};
            list();
        }
    }
})();