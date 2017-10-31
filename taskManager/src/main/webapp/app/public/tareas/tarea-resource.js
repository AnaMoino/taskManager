var module = angular.module('mpApp.public');


module.factory('tareaResource', function ($resource, comm) {
    return $resource(comm.url + '/tareas/:id', {
            id : '@id'
        }, {
        'queryAll': {
            method: 'GET',
            isArray: true
        },
        'query' : {
                method : 'GET',
                isArray : true
        },
        'update' : {
            method : 'PUT'
        }
    });
});

