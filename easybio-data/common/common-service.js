'use strict';
/* common services to call on any every page */
app.factory('UserService', ['$rootScope', '$resource','biodataConfig','localStorageService',
    function ($rootScope, $resource,biodataConfig,localStorageService) {
        return $resource(biodataConfig.apiUrl+'/v1/auth/register', {}, {
            'create': { method: 'POST', params: { data:JSON.stringify($rootScope.user) }, isArray: false },
        });
        return $resource(biodataConfig.apiUrl+'/v1/auth/user/', {}, {
            'query': { method: 'GET', params: {}, isArray: false },
        });
        return $resource(biodataConfig.apiUrl+'/v1/auth/user/:id', {id: '@_id'}, {
            'get': { method: 'GET', params: {}, isArray: false },
        });
        return $resource(biodataConfig.apiUrl+'/v1/auth/user/:id', {id: '@_id'}, {
            'update': { method: 'POST', params: {}, isArray: false },
        });
    }
])
.factory('AccountService', ['$rootScope', '$resource','biodataConfig',
    function ($rootScope, $resource,biodataConfig) {
        return $resource(biodataConfig.apiUrl+'/v1/users/:id/ ', { id: '@id' }, {
            'get': { method: 'GET', params: {}, isArray: false },
            'update': { method: 'PATCH', params: {}, isArray: false },
        });
    }
])
.factory('UserSubscriptionService', ['$rootScope', '$resource','biodataConfig',
    function ($rootScope, $resource,biodataConfig) {
        return $resource(biodataConfig.apiUrl+'/v1/users/:id/subscription/ ', { id: '@id' }, {
            'get': { method: 'GET', params: {}, isArray: false },
            'update': { method: 'PATCH', params: {}, isArray: false },
        });
    }
])
.factory('UserPaymentsService', ['$rootScope', '$resource','biodataConfig',
    function ($rootScope, $resource,biodataConfig) {
        return $resource(biodataConfig.apiUrl+'/v1/users/:id/payments/ ', { id: '@id' }, {
            'get': { method: 'GET', params: {}, isArray: false },
        });
    }
])
.factory('LogoutService', ['$resource','biodataConfig', function ($resource,biodataConfig) {
    return $resource(biodataConfig.apiUrl+'/v1/auth/logout', {}, {
        'logout': { method: 'POST', params: {}, isArray: false },
    })
}])
/*.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
})*/
/* check login state if direct url and then redirect it after login */
/*.factory('AuthResolver', function ($q, $rootScope, $state) {
  return {
    resolve: function () {
      var deferred = $q.defer();
      var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            deferred.resolve(currentUser);
          } else {
            deferred.reject();
            $state.go('user-login');
          }
          unwatch();
        }
      });
      return deferred.promise;
    }
  };
})
/*.factory('NewsLetterService', function ($resource) {
    return $resource('/api/newsLetter/subscribe', {}, {
        'save': { method: 'POST', params: {}, isArray: false },
    })
})*/
.service('QueryStringService', function ($location) {
    this.getFilters = function(filterObj) {
        var qs = $location.search();
        for (var param in filterObj) {
            if (param in qs) {
                filterObj[param] = qs[param];
            }
        }
        return filterObj;
    };
});