'use strict';
var commonService =  angular.module('easybiodata');
commonService.factory('AuthServerProvider', function authServerProvider(
		localStorageService, $rootScope,$cookies, $state,$http,biodataConfig,$q,$timeout) {
		
	return {
		authenticate : function() {
			var token = this.getToken();
			//console.log(token);
			var isAuthenticated = token;
			/*org code
			var isAuthenticated = token && token.expires_at
					&& token.expires_at > new Date().getTime();
			*/
			if (isAuthenticated) {
				$rootScope.$broadcast('event:auth-authConfirmed');
				return true;
			} else {
				$rootScope.$broadcast('event:auth-authRequired');
				return false;
			}
		},
        is_authenticated: function(username, password) {
        	var defered = $q.defer();
           // var data = {usernameOrEmail: username,password: password};
            return $http({
                method:'get', 
                url: biodataConfig.apiUrl+'/v1/auth/is_authenticated',
                headers: {'Content-Type': 'application/json; charset=utf-8' },
            }).success(function (response, status, headers, config) {
            	//console.log(status);
            	//console.log(response);
            	/*if(status.status === 401) {
                    // dostuff
                }*/
                return $q.reject(response);
	            defered.resolve(response.data);
	        }).error(function (response, status, headers, config) {
	        	//console.log(status);
            	//console.log(response);
	            defered.reject(response.data);
	        });
	        return defered.promise;
        },
        login: function(username, password) {
        	var defered = $q.defer();
            var data = {usernameOrEmail: username,password: password};
            return $http({
                method:'post', 
                url: biodataConfig.apiUrl+'/v1/auth/login',
                data: JSON.stringify(data),
                headers: {'Content-Type': 'application/json; charset=utf-8' },
            }).success(function (response, status, headers, config) {
            	$rootScope.loginErrorMessage=false;
	            defered.resolve(response.data);
	        }).error(function (response, status, headers, config) {
	        	$rootScope.$broadcast('event:auth-authRequired');
	        	//$rootScope.loginErrorMessage="Invalid Email/username or password";
	        	localStorageService.clearAll();
	            defered.reject(response);
	        });
	        return defered.promise;
        },
		signOff : function() {
			localStorageService.clearAll();
			$state.go('/user');
		},
		getToken : function() {
			return localStorageService.get('token');
		},
		hasValidToken : function() {
			var token = this.getToken();
			return token && token.expires_at
					&& token.expires_at > new Date().getTime();
		},
		/*isAuthorized : function() {
			if (!this.hasValidToken()) {
				localStorageService.clearAll();
				$state.go('/user');
			}
		},*/
		isAuthenticated: function () {
		    return !!localStorageService.get('id');
		},
		isAuthorized : function (authorizedRoles) {
			if (!this.hasValidToken()) {
				localStorageService.clearAll();
				$state.go('/home');
			}
		    if (!angular.isArray(authorizedRoles)) {
		      authorizedRoles = [authorizedRoles];
		    }
		    return (authService.isAuthenticated() &&
		      authorizedRoles.indexOf(localStorageService.get('userRole')) !== -1);
		},
		isNotAuthorize : function() {
			if (this.hasValidToken()) {
				if (angular.isDefined($rootScope.user)
						&& $rootScope.user != null) {
					var userName = $rootScope.user;
					$state.go("/userhome", {
						"userName" : userName
					});
				} else {
					$state.go("/");
				}
			}
		},
		userHasRole : function(role) {
			setTimeout(function() {
				if (angular.isDefined($rootScope.userRoles)) {
					for (var j = 0; j < $rootScope.userRoles.length; j++) {
						if (role == $rootScope.userRoles[j]) {
							return true;
						}
					}
				}
				$state.go("/user");
			}, 500);

		},
	};
});
/*
.factory('AuthService', function ($http, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
  return authService;
}) */