'use strict';

 angular.module('easybiodata')
 .factory('authInterceptor', ['$rootScope', '$location', 'localStorageService','AUTH_EVENTS' ,function ($rootScope, $location, localStorageService,AUTH_EVENTS) {
    return {
        // Add authorization token to headers
            request: function (config) {
                if($rootScope.currentRouteState == 'createBiodata'){
                    $rootScope.isLoadingBiodata=true;
                } else {
                    //$rootScope.isLoading=true;
                }
                var token = localStorageService.get('token');
                if (token && $rootScope.needAuthenticate) {
                    config.headers['Authentication-Token'] = token;
                }
                return config;
            },
            response: function(response) {
                $rootScope.$broadcast({
                    204: AUTH_EVENTS.noContent,
                    200: AUTH_EVENTS.success,
                }[response.status], response);
              $rootScope.isLoading=false;
              $rootScope.isLoadingBiodata=false;
              return response;
            }
    };
}])
.factory('authExpiredInterceptor', [ '$rootScope', '$q', '$injector', 'localStorageService','AUTH_EVENTS',function ($rootScope, $q, $injector, localStorageService,AUTH_EVENTS) {
    return {
        responseError: function (response) {
            //console.log(response.status);
            $rootScope.$broadcast({
                401: AUTH_EVENTS.wrongPassword,
                404: AUTH_EVENTS.notFound,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                409: AUTH_EVENTS.conflict,
                440: AUTH_EVENTS.sessionTimeout,
            }[response.status], response);
            $rootScope.isLoading=false;
            return $q.reject(response);
        }
    };
}]);