
var module = angular.module('mpApp.public');


module.controller('searchCategoriaController', function ($state, $log, categoriaResource) {
    var cat = this;
    
    cat.categorias = [];
    
    cat.search = function(){
        var successCallback = function(data, responseHeaders) {
            cat.categorias = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

        categoriaResource.queryAll({}, successCallback, errorCallback);
    };
    
    cat.delete = function(id){
        
    };
    
    cat.search();
});


module.controller('editCategoriaController', function ($state, $log, $stateParams, $location, categoriaResource) {
    var cat = this;
    
    cat.location = $location.path();
    cat.categoria = {};
    cat.get = function(){
        var successCallback = function(data, responseHeaders) {
            $log.info('retrieved successfuly ' + JSON.stringify(data));
            cat.categoria = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while searching ' + responseHeaders);
        };
        
        categoriaResource.query({id:$stateParams.id}, successCallback, errorCallback);
    };

    cat.guardar = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('updating successfuly ' + data);
            $state.go('public.categorias');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         cat.categoria.$update(successCallback, errorCallback);

    };
    
    cat.eliminar = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('removed successfuly ' + data);
            $state.go('public.categorias');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         cat.categoria.$remove(successCallback, errorCallback);

    };
    
    cat.cancel = function () {
        cat.categoria = {};
        $state.go('public.categorias');
    };
    
    cat.get();

});

module.controller('newCategoriaController', function ($state, $log, categoriaResource) {
    var cat = this;
    cat.categoria = {};

    cat.guardar = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            $state.go('public.categorias');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

        categoriaResource.save(cat.categoria, successCallback, errorCallback);

    };
    
    cat.cancel = function () {
        cat.categoria = {};
        $state.go('public.categorias');
    };

});