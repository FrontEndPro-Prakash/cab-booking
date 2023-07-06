(function() {
	"use strict";

	var ebdApp = angular.module('easybiodata');
	ebdApp.controller("LoginController", loginController);

	loginController.$inject = [ "$scope", "$state", "$filter",
			"localStorageService", "$timeout", "AuthServerProvider",
			"$rootScope", "$location",'AUTH_EVENTS','USER_ROLES','ERRORS','toasty'];

	function loginController($scope, $state, $filter, localStorageService,
		$timeout, AuthServerProvider, $rootScope, $location,AUTH_EVENTS,USER_ROLES,ERRORS,toasty) {

		/* 
			Login funciton to check user authentication 
		*/
		$scope.loginFunction = function(response) {
			$scope.isLoading=true;
			AuthServerProvider.login($scope.usrlogin.usernameOrEmail,
			$scope.usrlogin.password).then(function(response) {
				$scope.isLoading=false;
				if(!angular.isUndefined(response) && !angular.isUndefined(response.data) && response.data !='' && response.data.data !='' && response.data.success){
					console.log('login confirmed');
					$("#userLoginModal").modal("hide");
					$scope.currentUser = null;
					$scope.userRoles = USER_ROLES;
					$scope.isAuthorized = AuthServerProvider.isAuthorized;
					localStorageService.set('token', response.data.data.authenticationToken);
					localStorageService.set('userId', response.data.data.id);					
					localStorageService.set('firstTimeLogin', false);
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      				$scope.setCurrentUser(response.data.data);
					$scope.usrlogin.usernameOrEmail = undefined;
					$scope.usrlogin.password = undefined;
					$('.modal-backdrop').hide();

					if(angular.isUndefined(response.data.data.profileId) || response.data.data.profileId==''){
						localStorageService.set('profileId',null);
						//localStorage.removeItem('profileId');
						$timeout(function(){$state.go('dashboard');},600);
						return;
					} else {
						localStorageService.set('profileId',response.data.data.profileId);
					}
					$timeout(function(){$state.go('createBiodata');},600);
				} else if(!angular.isUndefined(response.data.data) && response.data.data =='' && response.data.success){
						/* there  should be something to handel when not authenticated */
						$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
						localStorageService.clearAll();
						$timeout(function(){$state.go('home');},600);	
				}
			});
		}
		$scope.openRegistration = function(){
			var isMobile = (function() {
		        var check = false;
			        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			        return check;
		    })();	
		    if(isMobile){
		    	$('#userLoginModal').modal('hide');
					$timeout(function(){$state.go('createBiodataMobileForm');},600);	
		    } else {
		    	$('#userLoginModal').modal('hide');
				setTimeout(function(){
			   		$('#userRegistrationModal').modal('show');
			   	},500);
		    }
			//console.log(CheckMobile.isMobile());
			/*$('#userLoginModal').modal('hide');
			setTimeout(function(){
		   		$('#userRegistrationModal').modal('show');
		   	},500);*/
		}
		$rootScope.$on(AUTH_EVENTS.notFound,function(){
        	console.log('wrong username');
        	//$scope.loginErrorMessage=ERRORS.errorWrongUsername;
        	/*var myToastMsg = ngToast.danger({
			  content: '<a class="">'+ERRORS.errorWrongUsername+'</a>',
			});*/
			$scope.loginErrorMessage = ERRORS.errorWrongUsername;
			/*toasty.error({
	            title: "Login Error",
	            msg: ERRORS.errorWrongUsername
	        });*/
        	$scope.isLoading=false;
        });
        $rootScope.$on(AUTH_EVENTS.wrongPassword,function(){
        	console.log('wrong password');
        	//$scope.loginErrorMessage=ERRORS.errorWrongPassword;
        	/*var myToastMsg = ngToast.danger({
			  content: '<a class="">'+ERRORS.errorWrongPassword+'</a>',
			});*/
			$scope.loginErrorMessage = ERRORS.errorWrongPassword;

			/* toasty.error({
	           title: "Login Error",
	            msg: ERRORS.errorWrongPassword
	        });*/
        	$scope.isLoading=false;
        });

		$scope.setCurrentUser = function (user) {
	    	$scope.currentUser = user;
	  	};

		$scope.showForgotPassword = function(){
			$("#userLoginModal").modal("hide");
			$state.go('forgotPassword');
		}

		/*$scope.loadSignUp = function() {
			$state.go('/user/register');
		}

		$scope.loadResetPasswordPage = function() {
			$state.go('/user/password');
		}*/
	}
}());