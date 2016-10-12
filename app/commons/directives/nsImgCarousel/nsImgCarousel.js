(function() {
  'use strict';
  angular
    .module('portalMovie')
    .directive('nsImgCarousel', ['$modal', function($modal) {

      var TEMPLATE_CAROUSEL = '' +
      '<div class="row m-10">' +
        '<div class="col-md-12 no-p" style="height: {{height}}px;">' +
          '<div style="width: {{width}}px; height: {{height}}px; margin: auto;">' +
            '<img name="imagem-{{$index}}" class="img-thumbnail"' +
                'ng-repeat="imagem in imagens track by $index"' +
                'ng-if="isIndiceImagemAtual($index)"' +
                'ng-src="{{imagem}}" style="width: 100%;height: 100%;">' +
            '<div name="img-anterior" style="' +
                              'cursor: pointer;' +
                              'width: 15%;' +
                              'height: 50%;' +
                              'float: left;' +
                              'top: -75%;' +
                              'left: 5%;' +
                              'position: relative;" ' +
                    'ng-click="imagemAnterior()">' +
              '<img ng-src="/images/anterior_off.png" style="width: 100%; height: 100%">' +
            '</div>' +
            '<div name="img-proxima" style="' +
                              'cursor: pointer;' +
                              'width: 15%;' +
                              'height: 50%;' +
                              'float: right;' +
                              'top: -75%;' +
                              'right: 5%;' +
                              'position: relative;" ' +
                    'ng-click="proximaImagem()">' +
              '<img ng-src="/images/proximo_off.png" style="width: 100%; height: 100%">' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

      return {
        restrict: 'E',
        scope: {
          imagens: '=imagens'
        },
        template: function() {
          return ''+
          '<div ng-if="usarModal()">' +
            '<img name="imagem-reduzida" class="img-thumbnail hand-pointer" width="50" height="50"' +
                 'ng-click="abrirModal()" ng-src="{{imagens[0]}}">' +
          '</div>' +
          '<div ng-if="!usarModal()" class="text-center">' +
            TEMPLATE_CAROUSEL +
          '</div>';
        },
        link: function(scope, elem, attrs) {
          scope.width = attrs.width ? attrs.width : 300;
          scope.height = attrs.height ? attrs.height : 300;
          scope.imagemErro = attrs.imagemErro ? attrs.imagemErro : '/images/400x400.jpg';
          var indiceImagemAtual = 0;

          scope.usarModal = function() {
            return attrs.usarModal === '' || (attrs.usarModal && attrs.usarModal.toLowerCase() === 'true');
          };

          scope.clicou = function() {
            return true;
          };

          scope.abrirModal = function() {
            $modal.open({
              template: '' +
                '<div class="modal-header">' +
                  '<button id="btnClose" type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="$close()">' +
                    '<span aria-hidden="true">&times;</span>' +
                  '</button>' +
                '</div>' +
                '<div class="modal-body text-center">' + TEMPLATE_CAROUSEL + '</div>',
              scope: this,
              size: 'sm'
            });
          };

          scope.isIndiceImagemAtual = function(indice) {
            return indiceImagemAtual === indice;
          };

          scope.imagemAnterior = function() {
            indiceImagemAtual = (indiceImagemAtual > 0) ? indiceImagemAtual - 1 : scope.imagens.length - 1;
          };

          scope.proximaImagem = function() {
            indiceImagemAtual = (indiceImagemAtual < scope.imagens.length - 1) ? indiceImagemAtual + 1 : 0;
          };
        }
      };
    }]);
})();
