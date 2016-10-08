(function () {
    'use strict';

    angular.module('portalMovie',
        ['ngRoute',
            'ngSanitize',
            'ui.bootstrap',
            'config',
            'portalMovie.movie',
            'portalMovie.serie',
            'portalMovie.view1',
            'portalMovie.view2'])
})();