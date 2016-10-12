(function () {
  'use strict';
  angular
    .module('portalMovie')
	  .directive('nsTableSort', function() {
      return {
        restrict : 'A',
        link : function (scope, element, attrs) {
          scope.ctrlSortFn = scope.$eval(attrs.nsTableSort);
        },
        controller : function($scope) {
          //Array indexada por nome da coluna, cujo valor pode ser:
          // 0: sem ordenação
          // 1: ascendente
          // 2: descendente
          var colunas = [];
          var ordemColunas = [];
          
          this.criarParametrosOrdem = function() {
            var params = { colunas: [], direcao: []};
            ordemColunas.forEach(function (ordemColuna) {
              var ordem = colunas[ordemColuna];
              if (ordem !== 0) {
                params.colunas.push(ordemColuna);
                params.direcao.push(ordem === 1 ? 'ASC' : 'DESC');
              }
            });
            return params;
          };
          
          this.adicionarColuna = function(nomeColuna, sentidoDefault) {
            var sentido = 0;
            var ascPatt = /ASC/i;
            var descPatt = /DESC/i;
            if (ascPatt.test(sentidoDefault)) {
              sentido = 1;
            } else if (descPatt.test(sentidoDefault)) {
              sentido = 2;
            }
            colunas[nomeColuna] = sentido;
            return sentido;
          };
          this.mudarOrdemColuna = function(nomeColuna) {
            colunas[nomeColuna] = (colunas[nomeColuna] + 1) % 3;
            
            var ordem = ordemColunas.indexOf(nomeColuna);
            if (ordem > -1) {
              //está na array, temos que tirar primeiro
              ordemColunas.splice(ordem, 1);
            }
            //E colocamos em primeiro lugar, para ser o mais prioritário
            ordemColunas.splice(0, 0, nomeColuna);
            
            //Chama a função para ordenar
            //Passa um objeto com atributo colunas (de tipo array) com os nomes das colunas
            //E um atributo direcao com a direção ('ASC'/'DESC') da coluna com mesmo índice
            //Pode passar o colunas como 'ordenadoPor' e o 'direcao' como 'ordem' para o
            //Back-end, pois o RestUtil já trata
            var parametrosOrdem = this.criarParametrosOrdem();
            $scope.ctrlSortFn(parametrosOrdem);
            
            //E devolve a nova 'direção' da coluna
            return colunas[nomeColuna];
          };
        }
      };
    })
    .directive('nsTableSortProperty', function() {
      var modificaClasseSentido = function (elemento, sentido) {
        var classeOrdem = '';
        if (sentido === 1) {
          classeOrdem = 'ns-sort-ascent';
        } else if (sentido === 2) {
          classeOrdem = 'ns-sort-descent';
        }
        elemento.removeClass('ns-sort-ascent');
        elemento.removeClass('ns-sort-descent');
        elemento.addClass(classeOrdem);
      };
      return {
        restrict : 'A',
        require : '^nsTableSort',
        link : function (scope, element, attrs, nsTableSortController) {
          modificaClasseSentido(element, nsTableSortController.adicionarColuna(attrs.nsTableSortProperty, attrs.nsTableSortDefault));
          element.addClass('hand-pointer');
          element.on('click', function() {
            modificaClasseSentido(element, nsTableSortController.mudarOrdemColuna(attrs.nsTableSortProperty));
          });
        }
      };
    });
})();
