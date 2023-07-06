(function(){
'use strict';

app.controller('AccountController', AccountController);
	AccountController.$inject = ['$scope','$rootScope','AccountService','user','localStorageService','AUTH_EVENTS','toasty','SUCCESS'];
	function AccountController($scope,$rootScope,AccountService,user,localStorageService,AUTH_EVENTS,toasty,SUCCESS){
		$scope.user={};
		$scope.user = user.data;
		//console.log(AccountService.get({'id':1}));
		$scope.updateUserAccount = function () {
			//$rootScope.isLoading=true;
			AccountService.update($scope.user).$promise.then(function() {
		    //  $rootScope.isLoading=false;
		    });
			//var user = AccountService.get({"id":$scope.user.id});
			//$scope.user = user.data;
			//console.log($scope.user);
		}
		/*$scope.changeMyAccount = function($event) {
		   // $timeout(function() {
		        angular.element($event.target.form).triggerHandler('submit');
		   // });
		};*/
		$rootScope.$on(AUTH_EVENTS.noContent,function(){
        	console.log('User Account Updated');
        	//$scope.successMessage="Account Updated";	
        	//$scope.loginErrorMessage=ERRORS.errorWrongUsername;
        	
        	/*ngToast.create({
			  className: 'success',
			  content: '<a href="#" class="">Account Updated</a>'
			});*/

        	/*var myToastMsg = ngToast.success({
			  content: '<a class="">'+SUCCESS.accountInfoUpdated+'</a>',
			});*/
			toasty.success({
	           title: "Success",
	            msg: SUCCESS.accountInfoUpdated
	        });
        	$scope.isLoading=false;
        });
	}
})();