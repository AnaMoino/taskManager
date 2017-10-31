
var module = angular.module('mpApp.public');


module.controller('searchTareaController', function ($log, tareaResource, $uibModal, $log, $document) {
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
            $log.error(data);
            tr.tareas = data;
        };

                var errorCallback = function(responseHeaders) {
                $log.error('search error ' + responseHeaders);
                };

        //tareaResource.query({text:texto}, successCallback, errorCallback);
        tareaResource.query({"max":100, "text":texto}, successCallback, errorCallback);
        }

        tr.search();
        
        tr.cancel = function () {
            tr.tarea = {};
            $uibModalInstance.dismiss({$value: 'cancel'});
        };
        
        tr.open = function (tarea) {
            if(tarea){
                var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/public/tareas/tareaDetalle.html',
                            controller: 'editTareaController',
                            controllerAs: 'tr',
                            size: 'lg',
                            resolve: {
                                tarea: function () {
                                    return tarea;
                                }
                            }
                        });
                    
                   
  
              modalInstance.result.then(
                      function (tareas) { 
                          tr.search();
                        });
            }else{
                var modalInstance = $uibModal.open({
                          animation: false,
                          ariaLabelledBy: 'modal-title',
                          ariaDescribedBy: 'modal-body',
                          templateUrl: 'app/public/tareas/tareaDetalle.html',
                          controller: 'newTareaController',
                          controllerAs: 'tr',
                          size: 'lg'
                       
                         });
                        
            }
             modalInstance.result.then(function (){
                             tr.search();
                         });        
                    }                    

    });

module.controller('newTareaController', function ($log, $location, tareaResource, $state, categoriaResource, $uibModalInstance) {
    var tr = this;
    tr.tarea = {};

    categoriaResource.queryAll({"max":1000}, (data)=> { tr.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });

                tr.save = function () {

                var successCallback = function(data, responseHeaders) {
                $log.info('saved successfuly ' + data);
                        //$state.go('public.tareas');
                         $uibModalInstance.close();
                };

                        var errorCallback = function(responseHeaders) {
                        $log.error('error while persisting');
                        };

                        tareaResource.save(tr.tarea, successCallback, errorCallback);

                };
    
                tr.cancel = function () {
//                tr.tarea = {};
//                        $state.go('public.tareas');
                $uibModalInstance.dismiss('cancel');
                };

        });


        module.controller('editTareaController', function (tarea, $log, $stateParams, $location, tareaResource, $state, categoriaResource, $uibModalInstance) {
        var tr = this;
                tr.location = $location.path();
                tr.tarea = tarea || {};
                tr.tarea.fechaLimite = new Date(tarea.fechaLimite);
                categoriaResource.queryAll({"max":1000}, (data)=> { tr.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });
    
//                tr.get = function(){
//                var successCallback = function(data, responseHeaders) {
//                $log.info('retrieved successfuly ' + JSON.stringify(data));
//                        tr.tarea = data;
//                        tr.tarea.fechaLimite = new Date(data.fechaLimite);
//                };
//
//                        var errorCallback = function(responseHeaders) {
//                        $log.error('error while searching ' + responseHeaders);
//                        };
//        
//                        tareaResource.query({id:$stateParams.id}, successCallback, errorCallback);
//                };

                tr.save = function () {

                var successCallback = function(data, responseHeaders) {
                $log.info('updating successfuly ' + data);
                        //$state.go('public.tareas');
                        $uibModalInstance.close();
                };

                        var errorCallback = function(responseHeaders) {
                        $log.error('error while persisting');
                        };
         
                        tr.tarea.$update(successCallback, errorCallback);

                };
    
                tr.delete = function () {

                var successCallback = function(data, responseHeaders) {
                $log.info('removed successfuly ' + data);
                        //$state.go('public.tareas');
                        $uibModalInstance.close();
                };

                        var errorCallback = function(responseHeaders) {
                        $log.error('error while persisting');
                        };
         
                        tr.tarea.$remove(successCallback, errorCallback);

                };
    
                tr.cancel = function () {
//                tr.tarea = {};
//                        $state.go('public.tareas');
                    tr.tarea = {};
                    $uibModalInstance.dismiss({$value: 'cancel'});
                };
    
                
                tr.search = function(){
                var successCallback = function(data, responseHeaders) {
                tr.tareas = data;
                };

                        var errorCallback = function(responseHeaders) {
                        $log.error('search error ' + responseHeaders);
                        };

                        tareaResource.queryAll({"max":100}, successCallback, errorCallback);
         
                };
                tr.open = function(tarea)
                {
                        
    }

        });

