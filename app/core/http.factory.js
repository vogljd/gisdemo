(function () {

    angular.module('app.core').factory("httpSvc", httpSvc);

    httpSvc.$inject = ['$http', '$q', 'api'];

    function httpSvc($http, $q, api) {

        var factory = {
            list: list,
            listSortSearch: listSortSearch,
            listPageSortSearch: listPageSortSearch,
            create: create,
            update: update,
            destroy: destroy
        };

        return factory;

        //region Private Functions

        function apiRoute(controller) {
            return api + controller;
        };

        function get(url) {
            var deferred = $q.defer();
            $http.get(url)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        function post(url, model) {
            var deferred = $q.defer();
            $http.post(url, model)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        function put(url, model) {
            var deferred = $q.defer();
            $http.put(url, model)
                .then(function (response) {
                    deferred.resolve(response);
                },
                function (error) {
                    deferred.reject(error);
                })
            return deferred.promise;
        };

        function del(url) {
            var deferred = $q.defer();
            $http.delete(url)
                .then(function (response) {
                    deferred.resolve(response);
                },
                function (error) {
                    deferred.reject(error);
                })
            return deferred.promise;
        };

        function sortAndSearch(orderBy, direction, search){

            if (orderBy == ''){
                return "/" + search;
            }

            if (direction == ''){
                direction = 'none'
            }

            return "/" + orderBy   + "/" + direction + "/" + search;
        }

        //endregion

        function list(controller) {
            var url = apiRoute(controller);
            return get(url);
        };

        function listSortSearch(controller, orderBy, direction, search) {
            var url = apiRoute(controller) + sortAndSearch(orderBy, direction, search);
            return get(url);
        };

        function listPageSortSearch(controller, pageSize, pageNumber, orderBy, direction, search) {
            var url = apiRoute(controller) + "/" + pageSize + "/" + pageNumber + sortAndSearch(orderBy, direction, search);
            return get(url);
        };

        function create(controller, model){
            var url = apiRoute(controller);
            return post(url, model);
        }

        function update(controller, model){
            var url = apiRoute(controller);;
            return put(url, model);
        }

        function destroy(controller, id){
            var url = apiRoute(controller) + "/" + id;
            return del(url);
        }

    };


}());