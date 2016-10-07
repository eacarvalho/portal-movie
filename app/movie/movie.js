(function () {
    'use strict';

    angular.module('portalMovie.movie',
        ['ngTable',
            'ui.grid',
            'ui.grid.pagination',
            'ui.grid.selection',
            'ui.grid.resizeColumns',
            'ui.grid.cellNav',
            'ui.grid.autoResize',
            'ui.grid.edit'
        ]);
}());