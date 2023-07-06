(function() {
	"use strict";
	var ebdApp = angular.module('easybiodata');
	ebdApp.controller("RegisterController", registerController);
	registerController.$inject = [ "$scope", "$state", "$filter","localStorageService","$timeout","AuthServerProvider","$rootScope","$location","UserService",'toasty','ERRORS','AUTH_EVENTS','FamilyRelationsService'];
	function registerController($scope, $state, $filter, localStorageService, $timeout, AuthServerProvider, $rootScope, $location,UserService,toasty,ERRORS,AUTH_EVENTS,FamilyRelationsService) {
		function init(){
			FamilyRelationsService.get().$promise.then(function(response){
				$scope.familyRelations = response.data;
			});
		}
		init();
		$scope.user={};
		$scope.saveUser = function(response) {
			UserService.create(JSON.stringify($scope.user)).$promise.then(function(response) {
				if(!angular.isUndefined(response) && !angular.isUndefined(response.data) && response.data !='' && response.success){
			    	localStorageService.set('token', response.data.authenticationToken);
					localStorageService.set('userId', response.data.id);
					localStorageService.set('profileId', response.data.profileId);
					localStorageService.set('firstTimeLogin', true);
					$('.modal-backdrop').hide();
					$timeout(function(){$state.go('createBiodata');},400);
				}
		    });
		}
		$scope.checkShowGender = function(){
			if($scope.user.biodataFor==1 || $scope.user.biodataFor == 6 || $scope.user.biodataFor == 7){
				$scope.showGender = true;	
				$scope.showFatherMother=false;
				$scope.showBrotherSister=false;				
			}
			else  {
				if($scope.user.biodataFor==2 || $scope.user.biodataFor==3){
					$scope.showFatherMother=true;
					$scope.showBrotherSister=false;
				} else if($scope.user.biodataFor==4 || $scope.user.biodataFor==5){
					$scope.showBrotherSister=true;
					$scope.showFatherMother=false;	
				}
				$scope.showGender = false;
			}
			if($scope.user.biodataFor==2 || $scope.user.biodataFor==4) {
				$scope.user.gender=1;
			} else if($scope.user.biodataFor==3 || $scope.user.biodataFor==5){
				$scope.user.gender=2;
			}
		}
		$rootScope.$on(AUTH_EVENTS.conflict,function() {
	        $scope.checkIfUserExists=true;
        	$scope.isLoading=false;
        });
	}
}());