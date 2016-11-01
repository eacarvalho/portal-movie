(function () {
    'use strict';

    function http($http, ENV) {

        var movieApi = ENV.movieApi;

        var ProxyHttp = function (api) {
            var configDefaults = {
                headers : {
                    'X-Requested-NS-WS' : '*'
                }
            };

            var ShyHttp = function (request) {
                request.url = api + request.url;
                request = angular.merge(request, configDefaults);
                return $http(request);
            };

            ShyHttp.get = function (url, config) {
                config = angular.merge((config || {}), configDefaults);
                // $http.defaults.headers.common['Authorization'] = 'Basic dXNlcjpwYXNzd29yZA==';
                // $http.defaults.headers.common['Authorization'] = 'Basic dXNlcjo5MmE5ZTE4Ny0yZDQzLTQzOTQtOTE0My05NzVhZTIzNTFjZjI=';
                return $http.get(api + url, config);
            };

            ShyHttp.getFile = function (url, config) {
                config = angular.merge((config || {}), configDefaults, { responseType :'arraybuffer' });
                return $http.get(api + url, config);
            };

            ShyHttp.head = function (url, config) {
                config = angular.merge((config || {}), configDefaults);
                return $http.head(api + url, config);
            };

            ShyHttp.post = function (url, data, config) {
                config = angular.merge((config || {}), configDefaults);
                return $http.post(api + url, data, config);
            };

            ShyHttp.postFile = function (url, data, config) {
                config = angular.merge((config || {}), configDefaults, { responseType :'arraybuffer' });
                return $http.post(api + url, data, config);
            };

            ShyHttp.put = function (url, data, config) {
                config = angular.merge((config || {}), configDefaults);
                return $http.put(api + url, data, config);
            };

            ShyHttp.delete = function (url, config) {
                config = angular.merge((config || {}), configDefaults);
                return $http.delete(api + url, config);
            };

            ShyHttp.url = api;

            return ShyHttp;
        };

        return {
            movie : new ProxyHttp(movieApi)
        };
    }

    angular.module('portalMovie').factory('Api', http);
})();