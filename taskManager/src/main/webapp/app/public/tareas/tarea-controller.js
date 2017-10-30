
var module = angular.module('mpApp.public');


module.controller('searchTareaController', function ($log, tareaResource) {
    var tr = this;
    
    tr.tareas = [];
    
    tr.search = function(){
        var successCallback = function(data, responseHeaders) {
            tr.tareas = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

         tareaResource.queryAll({"max":100}, successCallback, errorCallback);
         
    };

    tr.evaluateState = function(value){
        if (value)
            return 'Finalizada';
        return 'Pendiente';
    }
    
    tr.buscarTarea = function(texto){
        var successCallback = function(data, responseHeaders) {
            tr.tareas = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

        tareaResource.queryAll({"max":100, "busqueda":searchText}, successCallback, errorCallback);
    }
    
    tr.search();
});

module.controller('newTareaController', function ($log, $location, tareaResource, $state, categoriaResource) {
    var tr = this;
    tr.tarea = {};
    
    categoriaResource.queryAll({"max":1000}, (data)=> { tr.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });

    tr.save = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            $state.go('public.tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

        tareaResource.save(tr.tarea, successCallback, errorCallback);

    };
    
    tr.cancel = function () {
        tr.tarea = {};
        $state.go('public.tareas');
    };

});


module.controller('editTareaController', function ($log, $stateParams, $location, tareaResource, $state, categoriaResource) {
    var tr = this;
    tr.location = $location.path();
    tr.tarea = {};
    categoriaResource.queryAll({"max":1000}, (data)=> { tr.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });
    
    tr.get = function(){
        var successCallback = function(data, responseHeaders) {
            $log.info('retrieved successfuly ' + JSON.stringify(data));
            tr.tarea = data;
            tr.tarea.fechaLimite = new Date(data.fechaLimite);
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while searching ' + responseHeaders);
        };
        
        tareaResource.query({id:$stateParams.id}, successCallback, errorCallback);
    };

    tr.save = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('updating successfuly ' + data);
            $state.go('public.tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         tr.tarea.$update(successCallback, errorCallback);

    };
    
    tr.delete = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('removed successfuly ' + data);
            $state.go('public.tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         tr.tarea.$remove(successCallback, errorCallback);

    };
    
    tr.cancel = function () {
        tr.tarea = {};
        $state.go('public.tareas');
    };
    
    tr.get();

});

