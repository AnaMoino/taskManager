
var module = angular.module('mpApp.public', ['mpApp.ui','ui.router','ngResource']);

module.constant('comm',{
    url : '/taskmanager/rest'
});

module.config(function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/')
	$stateProvider.state('public', {
            abstract : true,
            data : {
                title : 'MP Enterprise'
            }
        });

	$stateProvider.state('public.tareas', {
        url : '/tareas',
        data : {
            title : 'Tareas'
        },
        views : {
            "root@app" : {
                templateUrl : 'app/public/tareas/tarea.html',
                controller : 'searchTareaController',
                controllerAs : 'tr'
            }
        },
        resolve: { 
        	searchPostFiles: function($ocLazyLoad) {
                     return $ocLazyLoad.load(['app/public/tareas/tarea-resource.js',
                         'app/public/tareas/tarea-controller.js',
                         'app/public/categorias/categoria-resource.js']);
            }
        }
    });
        
    $stateProvider.state('public.tareas.new', {
        url : '/new',
        views : {
            "root@app" : {
                templateUrl : 'app/public/tareas/tareaDetalle.html',
                controller : 'newTareaController',
                controllerAs : 'tr'
            }
        }
	});
	
	$stateProvider.state('public.tareas.edit', {
        url : '/update/:id',
        views : {
            "root@app" : {
                templateUrl : 'app/public/tareas/tareaDetalle.html',
                controller : 'editTareaController',
                controllerAs : 'tr'
            }
        }
	});
	
	$stateProvider.state('public.categorias', {
        url : '/categorias',
        views : {
            "root@app" : {
                templateUrl : 'app/public/categorias/categoria.html',
                controller : 'searchCategoriaController',
                 controllerAs : 'cat'
            }
        },
        resolve: { 
        	searchPostFiles: function($ocLazyLoad) {
                     return $ocLazyLoad.load(['app/public/categorias/categoria-resource.js',
                    	 'app/public/categorias/categoria-controller.js']);
            }
        }
	});
        
    $stateProvider.state('public.categorias.new', {
        url : '/new',
        views : {
            "root@app" : {
                templateUrl : 'app/public/categorias/categoriaDetalle.html',
                controller : 'newCategoriaController',
                 controllerAs : 'cat'
            }
        }
	});
    
    $stateProvider.state('public.categorias.edit', {
        url : '/update/:id',
        views : {
            "root@app" : {
                templateUrl : 'app/public/categorias/categoriaDetalle.html',
                controller : 'editCategoriaController',
                 controllerAs : 'cat'
            }
        }
	});
});
