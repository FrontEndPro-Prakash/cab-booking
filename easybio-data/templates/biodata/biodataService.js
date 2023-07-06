'use strict';
/* common services to call on any every page */
app.factory('BiodataService', ['$rootScope', '$resource','biodataConfig','localStorageService',
    function ($rootScope, $resource,biodataConfig,localStorageService) {
        return $resource(biodataConfig.apiUrl+'/v1/profiles/:id/ ', { id: '@id' }, {
            'get': { method: 'GET', params: {}, isArray: false },
            'update': { method: 'PATCH', params: {}, isArray: false },
        });
    }
]);
app.factory('ReligionService', ['$rootScope', '$resource','biodataConfig','localStorageService',
    function ($rootScope, $resource,biodataConfig,localStorageService) {
        var ReligionService =  $resource(biodataConfig.apiUrl+'/v1/religions/ ', {}, {
            'get': { method: 'GET', params: {}, isArray: false,cache : true },
        });
        return ReligionService;
    }
]);
app.factory('ReligionSymbolService', ['$rootScope', '$resource','biodataConfig','localStorageService',
    function ($rootScope, $resource,biodataConfig,localStorageService) {
        return $resource(biodataConfig.apiUrl+'/v1/religionSymbols/ ', { }, {
            'get': { method: 'GET', params: {}, isArray: false,cache : true },
        });
    }
]);
app.factory('EducationLevelsService', ['$rootScope', '$resource','biodataConfig','localStorageService',
    function ($rootScope, $resource,biodataConfig,localStorageService) {
        return $resource(biodataConfig.apiUrl+'/v1/educationLevels/ ', { }, {
            'get': { method: 'GET', params: {}, isArray: false,cache : true },
        });
    }
]);
app.factory('FamilyRelationsService', ['$rootScope', '$resource','biodataConfig','localStorageService',
    function ($rootScope, $resource,biodataConfig,localStorageService) {
        return $resource(biodataConfig.apiUrl+'/v1/familyRelations/ ', { }, {
            'get': { method: 'GET', params: {}, isArray: false,cache : true },
        });
    }
]);
app.factory('ShareBiodataService', ['$rootScope', '$resource','biodataConfig','localStorageService',
    function ($rootScope, $resource,biodataConfig,localStorageService) {
        return $resource(biodataConfig.apiUrl+'/v1/share_biodata/ ', {}, {
            'post': { method: 'POST', params: {}, isArray: false },
        });
    }
]);