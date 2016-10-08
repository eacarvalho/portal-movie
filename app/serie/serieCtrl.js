(function () {
    'use strict';

    angular
        .module('portalMovie.movie')
        .controller('SerieCtrl', [SerieCtrl]);

    function SerieCtrl() {

        var ctrl = this;
        ctrl.teste = 'Teste1';
    }
})();