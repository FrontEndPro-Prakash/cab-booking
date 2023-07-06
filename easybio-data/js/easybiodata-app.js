(function(){
	'use strict';
	
	app = angular.module('easybiodata', ['ngAnimate','ui.bootstrap','ui.router','mb-scrollbar','ngCookies','timer','angular-flexslider','xeditable','ngSanitize','ngMessages','ngResource','LocalStorageModule','ngFlash','angular-toasty','ngTagsInput','angularPayments']);
	angular.module('easybiodata').constant("biodataConfig", {
        "apiUrl": "http://54.169.77.206",
        "apiPort": "80",
        "baseUrl": "http://localhost/easybiodata/#/",
    });
    app.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		notFound: 'auth-not-found',
		wrongPassword: 'auth-wrong-password',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized',
		noContent:'auth-no-content',
		success:'auth-success',
		conflict:'auth-conflict-object',
		firstTimeLogin:'auth-first-time-login',
	});
	app.constant('ERRORS', {
		errorWrongUsername: 'Your username/email is incorrect',
		errorWrongPassword: 'Your password is incorrect',
		errorEmailExists: 'Already Registered Account with this Email'
	});
	app.constant('SUCCESS', {
		accountInfoUpdated: 'Account Information Updated',
	});
	app.constant('USER_ROLES', {
	  all: '*',
	  admin: 'admin',
	  editor: 'editor',
	  guest: 'guest'
	});

	app.config(['$httpProvider',function ($httpProvider) {
	    Stripe.setPublishableKey('pk_test_FOUOKh5Is1WhuRWGwdyhvdYl');
	    //rest of route code
	}]);	

	app.config(['$httpProvider',function ($httpProvider) {
	    $httpProvider.defaults.withCredentials = true;
	    //rest of route code
	}]);
	app.config(['toastyConfigProvider', function(toastyConfigProvider) {
	    toastyConfigProvider.setConfig({
	        sound: true,
	        shake: false,
	        theme: 'bootstrap'
	    });
	}]);
	
	app.run(['$rootScope','$state',function($rootScope,$state){
	  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	        //console.log(toState);
  	        $rootScope.home = (toState.name == 'home');
            $rootScope.currentRouteState = $state.current.name;
            $rootScope.isLoadingPage = false;
	  });
	  $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
	        //console.log(toState);
  	        //$rootScope.home = (toState.name == 'home');
           // $rootScope.currentRouteState = $state.current.name;
           $rootScope.isLoadingPage = false;
	  });
	  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
	        //console.log(toState);
  	       // $rootScope.home = (toState.name == 'home');
            //$rootScope.currentRouteState = $state.current.name;
            $rootScope.isLoadingPage = false;
	  });
	}]);

app.config(function(dropzoneOpsProvider){
    dropzoneOpsProvider.setOptions({
    	url: 'http://localhost/easybiodata/#/create-biodata',
        maxFilesize: 100,
        paramName: "uploadfile",
        maxThumbnailFilesize: 10,
        parallelUploads: 2,
        autoProcessQueue: true,
        thumbnailWidth:200,
        thumbnailHeight:200,
        addRemoveLinks:false,
        previewTemplate:'<div class="dz-preview dz-image-preview">'+
        				  '<a data-dz-remove="" href="javascript:undefined;" class="dz-remove">x</a>'+
						  '<div class="dz-image"><img data-dz-thumbnail/></div>'+
						  '<!-- <div class="dz-details">'+
						    '<div class="dz-filename"><span data-dz-name></span></div>'+
						    '<div class="dz-size" data-dz-size></div>'+
						    '<img data-dz-thumbnail />'+
						  '</div> -->'+
						  '<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>'+
						  '<div class="dz-success-mark"><span>✔</span></div>'+
						  '<div class="dz-error-mark"><span>✘</span></div>'+
						  '<!-- <div class="dz-error-message"><span data-dz-errormessage></span></div> -->'+
						  ''+
						'</div>',
    });
});
app.provider('dropzoneOps', function(){
		/*
		 *	Add default options here
		**/
		var defOps = {
		
		};
		
		return {
			setOptions : function(newOps){
				angular.extend(defOps, newOps);
			},
			$get : function(){
				return defOps;
			}
		}
	}).directive('ngDropzone', ['$timeout', 'dropzoneOps', function($timeout, dropzoneOps){
		return {
			restrict : 'AE',
			template : '<div></div>',
			replace : true,
			scope : {
				options : '=?', //http://www.dropzonejs.com/#configuration-options
				callbacks : '=?', //http://www.dropzonejs.com/#events
				methods : '=?' //http://www.dropzonejs.com/#dropzone-methods
			},
			link : function(scope, iElem, iAttr){
				//Set options for dropzone {override from dropzone options provider}
				scope.options = scope.options || {};
				var initOps = angular.extend({}, dropzoneOps, scope.options);
				
				
				//Instantiate dropzone with initOps
				var dropzone = new Dropzone(iElem[0], initOps);
				
				
				/*********************************************/
				
				
				//Instantiate Dropzone methods (Control actions)
				scope.methods = scope.methods || {};
				
				scope.methods.getDropzone = function(){ 
					return dropzone; //Return dropzone instance
				};
				
				scope.methods.getAllFiles = function(){ 
					return dropzone.files; //Return all files
				};
				
				var controlMethods = [
					'removeFile', 'removeAllFiles', 'processQueue',
					'getAcceptedFiles', 'getRejectedFiles', 'getQueuedFiles', 'getUploadingFiles',
					'disable', 'enable', 'confirm', 'createThumbnailFromUrl'
				];
				
				angular.forEach(controlMethods, function(methodName){
					scope.methods[methodName] = function(){
						dropzone[methodName].apply(dropzone, arguments);
						if(!scope.$$phase && !scope.$root.$$phase) scope.$apply();
					}
				});
				
				
				/*********************************************/
				
				
				//Set invents (callbacks)
				if(scope.callbacks){
					var callbackMethods = [
						'drop', 'dragstart', 'dragend',
						'dragenter', 'dragover', 'dragleave', 'addedfile', 'removedfile',
						'thumbnail', 'error', 'processing', 'uploadprogress',
						'sending', 'success', 'complete', 'canceled', 'maxfilesreached',
						'maxfilesexceeded', 'processingmultiple', 'sendingmultiple', 'successmultiple',
						'completemultiple', 'canceledmultiple', 'totaluploadprogress', 'reset', 'queuecomplete'
					];
					angular.forEach(callbackMethods, function(method){
						var callback = (scope.callbacks[method] || angular.noop);
						dropzone.on(method, function(){
							callback.apply(null, arguments);
							if(!scope.$$phase && !scope.$root.$$phase) scope.$apply();
						});
					});
				}
			}
		}
	}]);

	/* start of service to check weather user authenticated or not, at every page request */
	app.run(['$rootScope', '$location','AuthServerProvider','$state','AUTH_EVENTS','localStorageService',
    function ($rootScope, $location, AuthServerProvider,$state,AUTH_EVENTS,localStorageService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
           var checkAuthentication =  AuthServerProvider.authenticate();
           $rootScope.needAuthenticate = toState.authenticate;
           $rootScope.toState = toState.name;
           $rootScope.fromState = fromState.name;
           $rootScope.isLoadingPage = true;
	      if (!checkAuthentication && !angular.isUndefined(toState.authenticate) && toState.authenticate) { 
	      		//console.log('not login');
	      		//$("#userLoginModal").modal("show");
	        	$state.go('home');
     		 	event.preventDefault(); 
	      }
    	});

        $rootScope.$on('event:auth-authRequired', function () {
        	//console.log('authenticated false');
            $rootScope.authenticate = false;
            //$state.go('home');
        });
        // Call when the user logs out
        $rootScope.$on('event:auth-authConfirmed', function () {
        	//console.log('authenticated true');
        	$rootScope.authenticate = true;
        	$("#userLoginModal").modal("hide");
        });
      	$rootScope.$on(AUTH_EVENTS.wrongPassword, function(){
      		localStorageService.clearAll();
      		$state.go('home');
    	});
    }]);
    /* end of service to check weather user authenticated or not, at every page request */
    app.config(['$httpProvider', function($httpProvider) {
    	$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}]);
	/* Start Modals */
	angular.module('easybiodata').controller('HeaderController',['$rootScope','$scope','$location', '$uibModal', '$log','LogoutService','localStorageService','$state', function ($rootScope,$scope,$location, $uibModal, $log,LogoutService,localStorageService,$state) {
		$scope.logoutFunction = function () {
	        LogoutService.logout(function (data) {
	        	localStorageService.clearAll();
	        	//console.log(data);
	             if (!angular.isUndefined(data.success) && data.success) {
	               /* $localStorage.user = {};
	                $localStorage.authenticate = false;*/
	                $rootScope.authenticate=false;
	                $state.go('home');
	            }
	        });
	    };
	  $scope.openRegistrationForm = function(){
	   	$('#userRegistrationModal').modal('show');
		setTimeout(function(){
	   		$('#userRegistrationForm #userFullName').focus();
	   		//console.log('focused');
	   	},500);
	  }
	  $scope.openUserLoginForm = function(){
	   	$('#userLoginModal').modal('show');
	   	setTimeout(function(){
	   		$('#userLoginForm #userEmail').focus();
	   		//console.log('focused');
	   	},500);
	  }
	  $scope.openuserResetPassword = function(){
	   	$('#userResetPassword').modal('show');
	  }
	  $scope.openuserOptPassword = function(){
	   	$('#userOptPassword').modal('show');
	  }
	  $scope.openCloseAccount = function(){
		$('#closeAccount').modal('show');
	  }
	  $scope.openmessageSent = function(){
		$('#messageSent').modal('show');
	  }
	  $scope.openDeclineStepOne = function(){
		$('#declineStepOne').modal('show');
	  }
	  $scope.openDeclineStepSecond = function(){
	  	$('#declineStepOne').modal('hide');
		setTimeout(function(){
			$('#declineStepSecond').modal('show');
		},350);
	  }
	  $scope.openBiodataAnotherPerson = function(){
		$('#biodataAnotherPerson').modal('show');
	  }	
	  $scope.openuserProcessComplete = function(){
		$('#userProcessComplete').modal('show');
		setTimeout(function(){
			$('#userProcessComplete .btn-orange').focus();
		},350);	
	  }
	  $scope.openpreivewUserBiodata = function(){
		$('#userProcessComplete').modal('hide');
		setTimeout(function(){
			$('#preivewUserBiodata').modal('show');		
		},350);	
	  }
	  $scope.openpreivewUserPic = function(){
		//$('#preivewUserBiodata').modal('hide');
		$('#preivewUserPic').modal('show');		
	  }
	  $scope.openpreivewUserPicDashboard = function(){
		//$('#preivewUserBiodata').modal('hide');
		$('#preivewUserPicDashboard').modal('show');		
	  }
	  $scope.openuploadUserPhoto = function(){
		$('#uploadUserPhoto').modal('show');
	  }
	  $scope.openChooseTemplate = function(){
		$('#chooseTemplate').modal('show');
	  }	
	  $scope.openfaqRelationManager = function(){
		$('#faqRelationManager').modal('show');
	  }
	   $scope.opencontactmessageSent = function(){
		$('#contactmessageSent').modal('show');
	  }
	  $scope.openpotentialSpouse = function(){
		$('#potentialSpouse').modal('show');
	  }
	  $scope.openfullUserBiodata = function(){
		$('#fullUserBiodata').modal('show');
	  }
	  $scope.openshareBiodataForm = function(){
		$('#shareBiodataForm').modal('show');
	  }	
	  $scope.openHelpQuestion = function(questionPath){
	  	 $location.path(questionPath); 
         $location.replace();
         $('.outside-div').click();
        // console.log('help question redirected to '+questionPath);
	  }
	}]);	
	/* End Modals */
	
	/* run editable option for text boxes or other controles */
	angular.module('easybiodata').run(function(editableOptions) {
  		editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	});
	/* end of -- run editable option for text boxes or other controles */
	/* Start Accordion */
	angular.module('easybiodata').controller('AccordionCtrl', function ($scope) {
	  $scope.oneAtATime = true;
	  $scope.groups = [
		{
		  title: 'Dynamic Group Header - 1',
		  content: 'Dynamic Group Body - 1'
		},
		{
		  title: 'Dynamic Group Header - 2',
		  content: 'Dynamic Group Body - 2'
		}
	  ];
	  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

	  $scope.addItem = function() {
		var newItemNo = $scope.items.length + 1;
		$scope.items.push('Item ' + newItemNo);
	  };
	  $scope.status = {
		isFirstOpen: true,
		isFirstDisabled: false
	  };
	});
	/* End Accordion */	
	/* Start Progress Bar */	
	angular.module('easybiodata').controller('ProgressCtrl', function ($scope) {
	  $scope.max = 200;
	  $scope.random = function() {
		var value = Math.floor(Math.random() * 100 + 1);
		var type;
		if (value < 25) {
		  type = 'success';
		} else if (value < 50) {
		  type = 'info';
		} else if (value < 75) {
		  type = 'warning';
		} else {
		  type = 'danger';
		}
		$scope.showWarning = type === 'danger' || type === 'warning';
		$scope.dynamic = value;
		$scope.type = type;
	  };
	  $scope.random();
	  $scope.randomStacked = function() {
		$scope.stacked = [];
		var types = ['success', 'info', 'warning', 'danger'];
		for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
			var index = Math.floor(Math.random() * 4);
			$scope.stacked.push({
			  value: Math.floor(Math.random() * 30 + 1),
			  type: types[index]
			});
		}
	  };
	  $scope.randomStacked();
	});
	/* End Progress Bar */
	/* Start Tooltip */	
	angular.module('easybiodata').controller('TooltipCtrl', function ($scope, $sce) {
	  $scope.dynamicTooltip = 'Hello, World!';
	  $scope.dynamicTooltipText = 'dynamic';
	  $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');
	  $scope.placement = {
		options: [
		  'top',
		  'top-left',
		  'top-right',
		  'bottom',
		  'bottom-left',
		  'bottom-right',
		  'left',
		  'left-top',
		  'left-bottom',
		  'right',
		  'right-top',
		  'right-bottom'
		],
		selected: 'top'
	  };
	});
	/* End Tooltip */
	/* Start Tabs */
	angular.module('easybiodata').controller('TabsCtrl', function ($scope, $window) {});


	/* End Tabs */
	/* Start Popover */
	angular.module('easybiodata').controller('PopoverCtrl', function ($scope, $sce) {
	  $scope.coordinatePopover = {
		templateUrl: 'coordinatePopoverTemplate.html'
	  };
	  $scope.placement = {
		options: [
		  'top',
		  'top-left',
		  'top-right',
		  'bottom',
		  'bottom-left',
		  'bottom-right',
		  'left',
		  'left-top',
		  'left-bottom',
		  'right',
		  'right-top',
		  'right-bottom'
		],
		selected: 'top'
	  };
	});
	/* End Popover */
	/* Start Popover */
	angular.module('easybiodata').controller('HelpPopoverCtrl', function ($scope, $sce) {
	  function init(){
	  		$scope.helpPopover = {
				templateUrl: 'helpPopoverTemplate.html'
			};
	  };
	  init();
	});
	/* End Popover */
	/* Start Home Page Video */
	function init(){
	    setTimeout(function(){
    		var coverElement =  document.getElementById('cover');
			if (typeof(coverElement) != 'undefined' && coverElement != null)
			{
				 document.getElementById('cover').onclick=function() {
					 document.getElementById('the-iframe').src+='?list=PL_pZGFQt5xztRS5lbCQi3DbPrbG2Ms6B5?rel=0&amp;autoplay=1';
					 document.getElementById('the-iframe').className='showe';
					 this.className='hidee';
		 		}
			}
	    },2000);
	}
	window.addEventListener?
	window.addEventListener('load',init,false):
	window.attachEvent('onload',init);
	/* End Home Page Video */
/* ==========+-+==========CUSTOM ANGULAR SCRIPT==========+-+========== */
	/* Star Help Question Dropdown */
	app.controller('HelpQuestion', HelpQuestion);
	HelpQuestion.$inject = ['$scope'];
	function HelpQuestion($scope){
		$scope.quantity = 4;
		$scope.helpsQ =[
			{"helpQuestion":"Lorem ipsum is simply dummy1",
			 "helpQlink":"/help-detail" 
			},
			{"helpQuestion":"Lorem ipsum is simply dummy2",
			 "helpQlink":"/help-detail" 
			},
			{"helpQuestion":"Lorem ipsum is simply dummy3",
			 "helpQlink":"/help-detail" 
			},
			{"helpQuestion":"Lorem ipsum is simply dummy4",
			 "helpQlink":"/help-detail" 
			},
			{"helpQuestion":"Lorem ipsum is simply dummy5",
			 "helpQlink":"/help-detail" 
			}
		]
	}		
	/* End Help Question Dropdown */

	app.controller('BiodataController', BiodataController);
	BiodataController.$inject = ['$scope','$timeout','userService','BiodataService','kundaliService','ShareBiodataService'];
	function BiodataController($scope,$timeout,userService,BiodataService,kundaliService,ShareBiodataService){
		var init = function () {

		$scope.countryArray = [
			{ "id": 1, "name": "USA" },
			{ "id": 2, "name": "Canada" },
			{ "id": 3, "name": "India" },
		];
		$scope.stateArray = [
			{"id":1, "name":"Alaska", "countryId": 1},
			{"id":2, "name":"California1", "countryId":2},
			{"id":3, "name":"California4", "countryId": 3},
			{"id":4, "name":"Alaska1", "countryId": 1},
			{"id":5, "name":"California2", "countryId":2},
			{"id":6, "name":"California2", "countryId": 3},
		];
		$scope.cityArray = [
			{"id":1, "name":"Anchorage2", "stateId": 1},
			{"id":2, "name":"Fairbanks1", "stateId": 1},
			{"id":3, "name":"Fairbanks2", "stateId": 2},
			{"id":4, "name":"Fairbanks3", "stateId": 4},
			{"id":5, "name":"Fairbanks3", "stateId": 6},
			{"id":6, "name":"Fairbanks4", "stateId": 5},
			{"id":7, "name":"Fairbanks5", "stateId": 5},
			{"id":8, "name":"Fairbanks6", "stateId": 3},
		];
		$scope.user = userService.getUser();
		$scope.user.kundali = kundaliService.getUserKundali();
		$scope.tempKundali = kundaliService.getUserKundali();


    	}
    	init();

		  /* dummy data */

		  $scope.CName = "Your Son’s Name";
		  $scope.CPhone = "Your Son’s Phone Number";
		  $scope.CEmail = "Your Son’s Email Id";
		  $scope.PersonPic = "images/ProfilePic/profile-photo.jpg";
		  $scope.PersonName = "Tanveer singh"; 
		  $scope.PersonRelation = "Father";
		  $scope.PersonEmail = "tanveer@gmail.com"; 
		  $scope.PersonPhone = "+91-123456789"; 
		  $scope.PersonAddress = "Address";
		  $scope.dob='';
		  $scope.selectedCountry={'id':1,'country':"USA"};
	      $scope.selectedState={'id':2,'state':"Alaska"}; 
	      $scope.selectedCity={'id':2,'city':"Anchorage2"};
		  $scope.states='';
		  $scope.cities='';
		  $scope.Symbol = "images/symbols/om.svg";
		  $scope.cards = [
			{"cardItem": [{"keys": "images/ProfilePic/profile-pic-big.jpg"}]}, 
			{"cardItem": [{"keys": "images/ProfilePic/profile-pic-big2.jpg"}]}
		  ];
		  /* end of dummy data */
		$scope.shareBiodata={};
		$scope.shareBiodataFunction = function(){
		 	$scope.shareBiodata.profile_id=1;
		 	//console.log($scope.shareBiodata);
		 	$scope.shareBiodata.email_list =  $scope.shareBiodata.emails.map(function(tag) { return tag.email; });
		 	$scope.shareBiodata.emails='';
		 	ShareBiodataService.post($scope.shareBiodata).$promise.then(function() {
	    	//console.log('user updated');
		    //  $rootScope.isLoading=false;
		    });
		}
	}
	/* Start Biodata Controller*/	
	app.controller('CreateBiodataController', CreateBiodataController);
	CreateBiodataController.$inject = ['$scope','$timeout','$interval','userService','BiodataService','kundaliService','user','profile','religions','religionSymbols','educationLevels','familyRelations','$rootScope','AUTH_EVENTS','localStorageService'];
	function CreateBiodataController($scope,$timeout,$interval,userService,BiodataService,kundaliService,user,profile,religions,religionSymbols,educationLevels,familyRelations,$rootScope,AUTH_EVENTS,localStorageService){
	var init = function () {
			$scope.userprofile = {};
			$scope.userprofile = profile.data;
			$scope.user = {};
			$scope.user = user.data;
			$scope.religionArray = religions.data;
			$scope.religionSymbols = religionSymbols.data;
			$scope.educationLevels = educationLevels.data;
			$scope.familyRelations = familyRelations.data;

			$scope.countryArray = [
				{ "id": 1, "name": "USA" },
				{ "id": 2, "name": "Canada" },
				{ "id": 3, "name": "India" },
			];
			$scope.stateArray = [
				{"id":1, "name":"Alaska", "countryId": 1},
				{"id":2, "name":"California1", "countryId":2},
				{"id":3, "name":"California4", "countryId": 3},
				{"id":4, "name":"Alaska1", "countryId": 1},
				{"id":5, "name":"California2", "countryId":2},
				{"id":6, "name":"California2", "countryId": 3},
			];
			$scope.cityArray = [
				{"id":1, "name":"Anchorage2", "stateId": 1},
				{"id":2, "name":"Fairbanks1", "stateId": 1},
				{"id":3, "name":"Fairbanks2", "stateId": 2},
				{"id":4, "name":"Fairbanks3", "stateId": 4},
				{"id":5, "name":"Fairbanks3", "stateId": 6},
				{"id":6, "name":"Fairbanks4", "stateId": 5},
				{"id":7, "name":"Fairbanks5", "stateId": 5},
				{"id":8, "name":"Fairbanks6", "stateId": 3},
			];
			$scope.userprofile.kundali = kundaliService.getUserKundali();
			$scope.tempKundali = kundaliService.getUserKundali();
			if(localStorageService.get('firstTimeLogin')){
				$scope.showCreateBiodataSteps=true;
				localStorageService.set('firstTimeLogin',false);
			} else {
				$scope.showCreateBiodataSteps=false;
				localStorageService.get('firstTimeLogin',false);
			}
			$scope.userprofileCopy = angular.copy($scope.userprofile);
			$interval(function() {
		      if(!angular.equals($scope.userprofileCopy,$scope.userprofile)){
		      		$scope.userprofileCopy = angular.copy($scope.userprofile);
		    		 BiodataService.update($scope.userprofile).$promise.then(function() {
			    	//console.log('user updated');
				      $rootScope.isLoading=false;
				    });
				    console.log("object updated");
		    	}
		    }, 7000);
    }
    init();

	/*$rootScope.$on(AUTH_EVENTS.firstTimeLogin, function(){
  		$scope.showCreateBiodataSteps=true;
	});*/


	 /* $scope.CName = "Your Son’s Name";
	  $scope.CPhone = "Your Son’s Phone Number";
	  $scope.CEmail = "Your Son’s Email Id";
	  $scope.PersonPic = "images/ProfilePic/profile-photo.jpg";
	  $scope.PersonName = "Tanveer singh"; 
	  $scope.PersonRelation = "Father";
	  $scope.PersonEmail = "tanveer@gmail.com"; 
	  $scope.PersonPhone = "+91-123456789"; 
	  $scope.PersonAddress = "Address";
	  $scope.dob='';
	  $scope.selectedCountry={'id':1,'country':"USA"};
      $scope.selectedState={'id':2,'state':"Alaska"}; 
      $scope.selectedCity={'id':2,'city':"Anchorage2"};
	  $scope.states='';
	  $scope.cities='';*/
	  $scope.PersonPic = "images/ProfilePic/profile-photo.jpg";
	  $scope.Symbol = "images/symbols/om.svg"; 
	 // $scope.showCreateBiodataSteps=true;
	  $scope.createBiodataStepOne=true;
	  $scope.createBiodataStepTwo=false;
	  $scope.createBiodataStepThree=false;
	  $scope.createBiodataStepFour=false;
	  $scope.createBiodataStepFive=false;
	  $scope.cards = [
		{"cardItem": [{"keys": "images/ProfilePic/profile-pic-big.jpg"}]}, 
		{"cardItem": [{"keys": "images/ProfilePic/profile-pic-big2.jpg"}]}
	  ];

    /*$scope.hideByDelay = function(thisElement){
    	console.log(thisElement);
    	thisElement.preventDefault();
    	$scope.showUserGotra=false;
    	console.log($scope.showUserGotra);
    }*/
	/* $scope.languagesArray = [
			{"id":1, "name":"Punjabi"},
			{"id":2, "name":"Hindi"},
			{"id":3, "name":"English"},
			{"id":4, "name":"Sanskrit"},
			{"id":5, "name":"Malwai"},
			{"id":7, "name":"Urdu"},
			{"id":8, "name":"Kannad"},
			{"id":9, "name":"Gujrati"},
			{"id":10, "name":"Malyalam"},
			{"id":11, "name":"Tamil"},
		];*/
	 

    $scope.$watch('userprofile', function(newUserProfile, oldUserProfile){

    	//$scope.userprofileCopy = angular.copy($scope.userprofile);
    	// console.log("object copied");
	    //console.log('user profile changed');
	   /* BiodataService.update($scope.userprofile).$promise.then(function() {
	    	//console.log('user updated');
		    //  $rootScope.isLoading=false;
		    });*/
	}, true);
	$scope.languagesArray = ["Punjabi","Hindi","English","Sanskrit","Malwai","Urdu","Kannad",
			"Gujrati","Malyalam","Tamil"];
		/*$scope.interestsArray = [
			{"id":1, "name":"Music"},
			{"id":2, "name":"Gardning"},
			{"id":3, "name":"Playing"},
			{"id":4, "name":"Reading"},
			{"id":5, "name":"TV"},
			{"id":7, "name":"Games"},
			{"id":8, "name":"Mobile"},
			{"id":9, "name":"Programming"},
			{"id":10, "name":"Dancing"},
			{"id":11, "name":"Singing"},
		];*/
		$scope.interestsArray = ["Music","Gardning","Playing","Reading","TV","Games","Mobile","Programming","Dancing","Singing"];
		$scope.degreeArray = [
			{"id":1, "name":"BCA"},
			{"id":2, "name":"BSC(IT)"},
			{"id":3, "name":"MSC"},
			{"id":4, "name":"MSC(IT)"},
			{"id":5, "namee":"BA"},
			{"id":9, "nam":"MCA"},
			{"id":7, "name":"B.com"},
			{"id":8, "name":"MA Punjabi"},
			{"id":10, "name":"MA Hindi"},
			{"id":11, "name":"MA English"},
		];
	   /*$scope.degreeArray = ['BCA','BSC(IT)','MSC','MSC(IT)','MCA','B.com','BA','MA Punjabi','MA Hindi','MA English'];*/
	   $scope.userprofile.language = '';
	   $scope.userprofile.interest = '';
	   $scope.languages = [];
	   $scope.opinterests = [];
	   $scope.userprofile.languages=[];
	   $scope.userprofile.interests=[];
	   $scope.userprofile.paternalPreview=true;
	   $scope.userprofile.maternalPreview=false;
	   $scope.changePreviewStatus = function(previewType) {
	    	if(previewType=='paternal'){
	    			$scope.userprofile.paternalPreview = !$scope.userprofile.paternalPreview;
	    	} else if(previewType=='maternal'){
	    			$scope.userprofile.maternalPreview = !$scope.userprofile.maternalPreview;
	    	}
		};
		
        /*$scope.countries = LocationService.getCountry();
        $scope.religions = ReligionService.getReligion();*/
        /*$scope.religionArray = [
				{ "id": 1, "name": "Hindu" },
				{ "id": 2, "name": "Sikh" },
				{ "id": 3, "name": "Muslim" },
			];*/
        /*$scope.incomes = IncomeService.getIncomes();
        $scope.zodiacs = ZodiacService.getZodiacs();*/
		$scope.zodiacArray = [ 
			{"id":1,"name":"Aries"},
			{"id":2,"name":"Taurus"},
			{"id":3,"name":"Gemini"},
			{"id":4,"name":"Cancer"},
			{"id":5,"name":"Libra"},
			{"id":6,"name":"Leo"},
			{"id":7,"name":"Scorpio"},
			{"id":8,"name":"Saggitarrius"},
			{"id":9,"name":"Virgo"},
			{"id":10,"name":"Aquarius"},
			{"id":11,"name":"Pisces"},
			{"id":12,"name":"Capricon"}
		];
		$scope.moonsignArray = ["Aries","Taurus","Gemini","Cancer","Libra","Leo","Scorpio","Saggitarrius","Virgo","Aquarius","Pisces","Capricon"];
		/*$scope.moonsignArray = [ 
			{"id":1,"name":"Aries"},
			{"id":2,"name":"Taurus"},
			{"id":3,"name":"Gemini"},
			{"id":4,"name":"Cancer"},
			{"id":5,"name":"Libra"},
			{"id":6,"name":"Leo"},
			{"id":7,"name":"Scorpio"},
			{"id":8,"name":"Saggitarrius"},
			{"id":9,"name":"Virgo"},
			{"id":10,"name":"Aquarius"},
			{"id":11,"name":"Pisces"},
			{"id":12,"name":"Capricon"}
		];*/
		$scope.incomeArray = [ "0 - 1 Lakh","1 - 2 Lakhs", "Above 10 Lakhs"];
        /* $scope.meritalstatuses = MaritalStatusService.getMeritalStatues(); */
        $scope.maritalStatusArray = ["Single","Merid","Devorced","Widow"]
        $scope.isNewEducationDetail=true;
        $scope.editEducationDetailIndex=-1;
        $scope.showEducationDetail=false;
        $scope.userprofile.EducationDetails =[
		  {"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
          {"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}},
            /*{"schoolUniversity":"PSEB","level":"Sen Sec","year":"2010","typeOfDegree":"BSCIt"}, */  
		];
        $scope.disabledFamilyInformation=true;
		if(angular.isDefined($scope.userprofile.EducationDetails) && $scope.userprofile.EducationDetails != ''){
			$scope.disabledFamilyInformation=false;
		}
		$scope.$watch("user", function(newValue, oldValue) {
		    if (angular.isDefined($scope.userprofile.EducationDetails) &&  $scope.userprofile.EducationDetails != '') {
		     	$scope.disabledFamilyInformation=false;
		    }
		 });
        $scope.EducationDetailsTemp = {"schoolUniversity":"","level":"","year":"","typeOfDegree":{"id":"", "name":""}};
    	/* function for using add or edit user kundali details */
    	$scope.saveUserKundali =  function(){
    		 $scope.userprofile.kundali = angular.copy($scope.tempKundali);
    		 $('.outside').click();
    	}
    	/* end of function for using add or edit user kundali details */
        /* function for using add or edit user educational details */
        $scope.addEducationDetail =  function(){
        	 //console.log("Edit index"+$scope.editEducationDetailIndex);
           if($scope.EducationDetailsTemp.schoolUniversity !='' && 
           	$scope.EducationDetailsTemp.level !='' && 
           	$scope.EducationDetailsTemp.year !='' 
           	&& $scope.EducationDetailsTemp.typeOfDegree !='' ) {
	            var schoolUniversity=angular.copy($scope.EducationDetailsTemp.schoolUniversity);
	            var level=angular.copy($scope.EducationDetailsTemp.level);
	            var year=angular.copy($scope.EducationDetailsTemp.year);
	            var typeOfDegree = new Object();
	            if(angular.isDefined($scope.EducationDetailsTemp.typeOfDegree.id)) {
           			typeOfDegree=angular.copy($scope.EducationDetailsTemp.typeOfDegree);
           		} else {
           			typeOfDegree.id = Date.now();
           			typeOfDegree.name = $scope.EducationDetailsTemp.typeOfDegree;
           		}
	           	if($scope.isNewEducationDetail){
	           		$scope.userprofile.EducationDetails.push({"schoolUniversity":schoolUniversity,"level":level,"year":year,"typeOfDegree":angular.copy(typeOfDegree)});
	           	} else {
	           		$scope.EducationDetailsTemp.typeOfDegree = angular.copy(typeOfDegree);
	           		angular.copy($scope.EducationDetailsTemp,$scope.userprofile.EducationDetails[$scope.editEducationDetailIndex]);
	           		$scope.editEducationDetailIndex=-1;
	           		$scope.isNewEducationDetail=true;
	          	}       
	            $scope.EducationDetailsTemp.schoolUniversity='';
	            $scope.EducationDetailsTemp.level='';
	            $scope.EducationDetailsTemp.year='';
	            $scope.EducationDetailsTemp.typeOfDegree='';
	            $scope.showEducationDetail=false;
     	  }
        }
        /* function is using for removing user educational details */
        $scope.removeEducationDetail = function(index) {
        	$scope.userprofile.EducationDetails.splice(index, 1);
		};	
		/* function is using for filling values into form for editng and saving user educational details */
        $scope.editEducationDetail = function(index){
        	//console.log($scope.userprofile.EducationDetails[index]);
        	$scope.editEducationDetailIndex=index;
        	$scope.isNewEducationDetail=false;
        	$scope.showEducationDetail=true;
        	//console.log($scope.showEducationDetail);
        	angular.copy($scope.userprofile.EducationDetails[index],$scope.EducationDetailsTemp);
        	//console.log($scope.EducationDetailsTemp);
        	$scope.editEducationDetailIndex=index;
        	$scope.isNewEducationDetail=false;
        	$scope.showEducationDetail=true;
        }
        $scope.addNewEducationDetail = function(index) {
        	   $scope.EducationDetailsTemp.schoolUniversity='';
	           $scope.EducationDetailsTemp.level='';
	           $scope.EducationDetailsTemp.year='';
	           $scope.EducationDetailsTemp.typeOfDegree='';
	           $scope.showEducationDetail=true;
	           $scope.isNewEducationDetail=true;
		};
		$scope.closeEducationDetail = function () {
        	$scope.showEducationDetail=false;
        }
        $scope.addBlankEductaionDetail = function() {
        	$scope.userprofile.EducationDetails.push(angular.copy($scope.EducationDetailsTemp));
        }
        /* end of user education array for storing work experience */
        /* arrays and functions for storing work experience */
        /* initilizing variables */
        $scope.isNewWorkExperience=true;
        $scope.editWorkExperienceIndex=-1;
        $scope.showWorkExperience=false;
        $scope.WorkExperienceTemp = {"companyName":"","title":"","city":"","description":""};
        $scope.userprofile.WorkExperiences =[
		  {"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
          {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
            /*{"schoolUniversity":"PSEB","level":"Sen Sec","year":"2010","typeOfDegree":"BSCIt"}, */  
		];
        /* function for using add or edit user work experience */
        $scope.addWorkExperience =  function(){
           if($scope.WorkExperienceTemp.companyName !='' && 
           	$scope.WorkExperienceTemp.title !='' && 
           	$scope.WorkExperienceTemp.city !='' && $scope.WorkExperienceTemp.description !='' ){
	           var companyName=angular.copy($scope.WorkExperienceTemp.companyName);
			   console.log(companyName);
			   console.log('temp companyName: '+$scope.WorkExperienceTemp.companyName);
	           var title=angular.copy($scope.WorkExperienceTemp.title);
	           var city=angular.copy($scope.WorkExperienceTemp.city);
	           var description=angular.copy($scope.WorkExperienceTemp.description);
	           if($scope.isNewWorkExperience){
	           		$scope.userprofile.WorkExperiences.push({"companyName":companyName,"title":title,
	           	"city":city,"description":description});
	           } else {
	           		angular.copy($scope.WorkExperienceTemp,$scope.userprofile.WorkExperiences[$scope.editWorkExperienceIndex]);
	           		$scope.editWorkExperienceIndex=-1;
	           		$scope.isNewWorkExperience=true;
	           }           
	           $scope.WorkExperienceTemp.companyName='';
	           $scope.WorkExperienceTemp.title='';
	           $scope.WorkExperienceTemp.city='';
	           $scope.WorkExperienceTemp.description='';
	           $scope.showWorkExperience= false;
           }
        }
        /* function is using for removing user work experience*/
        $scope.removeWorkExperience = function(index) {
        	$scope.userprofile.WorkExperiences.splice(index, 1);
		};
		/* function is using for filling values into form for editng and saving user work experience */
        $scope.editWorkExperience = function(index){
        	$scope.editWorkExperienceIndex=index;
        	$scope.isNewWorkExperience=false;
        	$scope.showWorkExperience=true;
        	angular.copy($scope.userprofile.WorkExperiences[index],$scope.WorkExperienceTemp);
        	$scope.editWorkExperienceIndex=index;
        	$scope.isNewWorkExperience=false;
        	$scope.showWorkExperience=true;
        }
        $scope.addNewWorkExperience = function(index) {
        	$scope.WorkExperienceTemp.companyName='';
	        $scope.WorkExperienceTemp.title='';
	        $scope.WorkExperienceTemp.city='';
	        $scope.WorkExperienceTemp.description='';
	        $scope.showWorkExperience=true;
	        $scope.isNewWorkExperienceTemp=true;
		}
        $scope.closeWorkExperience = function (){
        	$scope.showWorkExperience=false;
        }
        $scope.addBlankWorkExperience = function() {
        	console.log('add blank workDescription');
        	$scope.userprofile.WorkExperiences.push(angular.copy($scope.WorkExperienceTemp));
        }
        /* end of storing work experiences */
        /* arrays and functions for family members */
        /* initilizing variables */
        $scope.isNewFamilyInfo=true;
        $scope.editFamilyInfoIndex=-1;
        $scope.showFamilyInfo=false;
        $scope.isNewFamilyInfoWorkExperience=true;
        $scope.editFamilyInfoWorkExperienceIndex=-1;
        $scope.showFamilyInfoWorkExperience=false;
        $scope.FamilyInfoTemp = {"relation":"","name":"","city":"","state":"","country":"","workType":"","workDescription":""};
        $scope.userprofile.FamilyInfoArray =[
		 /* {"relation":"Brother","name":"Karan",city:{'id':2,'name':"Fairbanks1"},"state":{'id':2,'name':"Alaska"},"country":{'id':1,'name':"USA"},"workType":"Business","workDesctiption":"dummy work desctiption"},	
		  {"relation":"Father","name":"Pawan","city":{'id':2,'name':"Fairbanks1"},"state":{'id':2,'name':"Alaska"},"country":{'id':2,'name':"Canada"},"workType":"Shopkeeper","workDesctiption":"dummty work desctiption 2"},	*/
		];
      	/* function for using add or edit user work experience */
        $scope.addFamilyInfo =  function(){
           if($scope.FamilyInfoTemp.relation !='' && 
           	$scope.FamilyInfoTemp.name !='' && 
           	$scope.FamilyInfoTemp.city !='' 
           	&& $scope.FamilyInfoTemp.state !='' 
           	&& $scope.FamilyInfoTemp.country !='' ){
	           var relation=angular.copy($scope.FamilyInfoTemp.relation);
	           var name=angular.copy($scope.FamilyInfoTemp.name);
	           var city=angular.copy($scope.FamilyInfoTemp.city);
	           var state=angular.copy($scope.FamilyInfoTemp.state);
	           var country=angular.copy($scope.FamilyInfoTemp.country);
	           if($scope.isNewFamilyInfo){
	           		$scope.userprofile.FamilyInfoArray.push({"relation":relation,"name":name,
	           	"city":city,"state":state,"country":country});
	           } else {
	           		angular.copy($scope.FamilyInfoTemp,$scope.userprofile.FamilyInfoArray[$scope.editFamilyInfoIndex]);
	           		$scope.editFamilyInfoIndex=-1;
	           		$scope.isNewFamilyInfo=true;
	           }           
	           $scope.FamilyInfoTemp.relation='';
	           $scope.FamilyInfoTemp.name='';
	           $scope.FamilyInfoTemp.city='';
	           $scope.FamilyInfoTemp.state='';
	           $scope.FamilyInfoTemp.country='';
	           $scope.showFamilyInfo= false;
           }
        }
        $scope.addFamilyInfoWorkExperience =  function(){
           if($scope.FamilyInfoTemp.workType !='' && $scope.FamilyInfoTemp.workDescription !=''){
	           var workType=angular.copy($scope.FamilyInfoTemp.workType);
	           var workDescription=angular.copy($scope.FamilyInfoTemp.workDescription);
	           if($scope.isNewFamilyInfoWorkExperience){
	           		$scope.userprofile.FamilyInfoArray.push({"workType":workType,"workDescription":workDescription});
	           } else {
	           		angular.copy($scope.FamilyInfoTemp,$scope.userprofile.FamilyInfoArray[$scope.editFamilyInfoWorkExperienceIndex]);
	           		$scope.editFamilyInfoWorkExperienceIndex=-1;
	           		$scope.isNewFamilyInfoWorkExperience=true;
	           }           
	           $scope.FamilyInfoTemp.workType='';
	           $scope.FamilyInfoTemp.workDescription='';
	           $scope.showFamilyInfoWorkExperience= false;
           }
        }
        /* function is using for removing user work experience*/
        $scope.removeFamilyInfo = function(index) {
        	$scope.userprofile.FamilyInfoArray.splice(index, 1);
		};
		/* function is using for filling values into form for editng and saving user work experience */
        $scope.editFamilyInfo = function(index){
        	$scope.editFamilyInfoIndex=index;
        	$scope.isNewFamilyInfo=false;
        	$scope.showFamilyInfo=true;
        	angular.copy($scope.userprofile.FamilyInfoArray[index],$scope.FamilyInfoTemp);
        	$scope.editFamilyInfoIndex=index;
        	$scope.isNewFamilyInfo=false;
        	$scope.showFamilyInfo=true;
        }
        $scope.editFamilyInfoWorkExperience = function(index){
	        $scope.editFamilyInfoWorkExperienceIndex=index;
	        $scope.isNewFamilyInfoWorkExperienceisNewFamilyInfoWorkExperience=false;
	        $scope.showFamilyInfoWorkExperience=true;
	        angular.copy($scope.userprofile.FamilyInfoArray[index],$scope.FamilyInfoTemp);
        	$scope.editFamilyInfoWorkExperienceIndex=index;
        	$scope.isNewFamilyInfoWorkExperience=false;
        	$scope.showFamilyInfoWorkExperience=true;
        }
        $scope.addNewFamilyInfo = function(index) {
    	   $scope.FamilyInfoTemp.relation='';
           $scope.FamilyInfoTemp.name='';
           $scope.FamilyInfoTemp.city='';
           $scope.FamilyInfoTemp.state='';
           $scope.FamilyInfoTemp.country='';
           $scope.showFamilyInfo=true;
           $scope.isNewFamilyInfoTemp=true;
		}
        $scope.closeFamilyInfo = function (){
        	$scope.showFamilyInfo=false;
        }
        $scope.closeFamilyInfoWorkExperience = function (){
        	$scope.showFamilyInfoWorkExperience=false;
        }
        $scope.addBlankFamilyInfo = function() {
        	$scope.userprofile.FamilyInfoArray.push(angular.copy($scope.FamilyInfoTemp));
        }
        /* end of storing family work experiences */
     	/* arrays and functions for paternal family members */
        /* initilizing variables */
        $scope.isNewPaternalFamily=true;
        $scope.editPaternalFamilyIndex=-1;
        $scope.showPaternalFamily=false;
        $scope.isNewPaternalFamilyWorkExperience=true;
        $scope.editPaternalFamilyWorkExperienceIndex=-1;
        $scope.showPaternalFamilyWorkExperience=false;
        $scope.PaternalFamilyTemp = {"relation":"","name":"","city":"","state":"","country":"","workType":"","workDescription":""};
        $scope.userprofile.PaternalFamilyArray =[
		  {"relation":"Cusion","name":"Amit","city":{'id':2,'name':"Fairbanks1"},"state":{'id':2,'name':"Alaska"},"country":{'id':1,'name':"USA"},"workType":"Business","workDesctiption":"dummy work desctiption"},	
		  {"relation":"Uncle","name":"Rafi","city":{'id':2,'name':"Fairbanks1"},"state":{'id':2,'name':"Alaska"},"country":{'id':1,'name':"USA"},"workType":"Shopkeeper","workDesctiption":"dummty work desctiption 2"},	
		];
      	/* function for using add or edit user work experience */
        $scope.addPaternalFamily =  function(){
           if($scope.PaternalFamilyTemp.relation !='' && 
           	$scope.PaternalFamilyTemp.name !='' && 
           	$scope.PaternalFamilyTemp.city !='' 
           	&& $scope.PaternalFamilyTemp.state !='' 
           	&& $scope.PaternalFamilyTemp.country !='' ){
	           var relation=angular.copy($scope.PaternalFamilyTemp.relation);
	           var name=angular.copy($scope.PaternalFamilyTemp.name);
	           var city=angular.copy($scope.PaternalFamilyTemp.city);
	           var state=angular.copy($scope.PaternalFamilyTemp.state);
	           var country=angular.copy($scope.PaternalFamilyTemp.country);
	           if($scope.isNewPaternalFamily){
	           		$scope.userprofile.PaternalFamilyArray.push({"relation":relation,"name":name,
	           	"city":city,"state":state,"country":country});
	           } else {
	           		angular.copy($scope.PaternalFamilyTemp,$scope.userprofile.PaternalFamilyArray[$scope.editPaternalFamilyIndex]);
	           		$scope.editPaternalFamilyIndex=-1;
	           		$scope.isNewPaternalFamily=true;
	           }           
	           $scope.PaternalFamilyTemp.relation='';
	           $scope.PaternalFamilyTemp.name='';
	           $scope.PaternalFamilyTemp.city='';
	           $scope.PaternalFamilyTemp.state='';
	           $scope.PaternalFamilyTemp.country='';
	           $scope.showPaternalFamily= false;
           }
        }
        $scope.addPaternalFamilyWorkExperience =  function(){
           if($scope.PaternalFamilyTemp.workType !='' && $scope.PaternalFamilyTemp.workDescription !=''){
	           var workType=angular.copy($scope.PaternalFamilyTemp.workType);
	           var workDescription=angular.copy($scope.PaternalFamilyTemp.workDescription);
	           if($scope.isNewPaternalFamilyWorkExperience){
	           		$scope.userprofile.PaternalFamilyArray.push({"workType":workType,"workDescription":workDescription});
	           } else {
	           		angular.copy($scope.PaternalFamilyTemp,$scope.userprofile.PaternalFamilyArray[$scope.editPaternalFamilyWorkExperienceIndex]);
	           		$scope.editPaternalFamilyWorkExperienceIndex=-1;
	           		$scope.isNewPaternalFamilyWorkExperience=true;
	           }           
	           $scope.PaternalFamilyTemp.workType='';
	           $scope.PaternalFamilyTemp.workDescription='';
	           $scope.showPaternalFamilyWorkExperience= false;
           }
        }
        /* function is using for removing user work experience*/
        $scope.removePaternalFamily = function(index) {
        	$scope.userprofile.PaternalFamilyArray.splice(index, 1);
		};
		/* function is using for filling values into form for editng and saving user work experience */
        $scope.editPaternalFamily = function(index){
        	$scope.editPaternalFamilyIndex=index;
        	$scope.isNewPaternalFamily=false;
        	$scope.showPaternalFamily=true;
        	angular.copy($scope.userprofile.PaternalFamilyArray[index],$scope.PaternalFamilyTemp);
        	$scope.editPaternalFamilyIndex=index;
        	$scope.isNewPaternalFamily=false;
        	$scope.showPaternalFamily=true;
        }
        $scope.editPaternalFamilyWorkExperience = function(index){
        	$scope.editPaternalFamilyWorkExperienceIndex=index;
        	$scope.isNewPaternalFamilyWorkExperienceisNewPaternalFamilyWorkExperience=false;
        	$scope.showPaternalFamilyWorkExperience=true;
        	angular.copy($scope.userprofile.PaternalFamilyArray[index],$scope.PaternalFamilyTemp);
        	$scope.editPaternalFamilyWorkExperienceIndex=index;
        	$scope.isNewPaternalFamilyWorkExperience=false;
        	$scope.showPaternalFamilyWorkExperience=true;
        }
        $scope.addNewPaternalFamily = function(index) {
    	   $scope.PaternalFamilyTemp.relation='';
           $scope.PaternalFamilyTemp.name='';
           $scope.PaternalFamilyTemp.city='';
           $scope.PaternalFamilyTemp.state='';
           $scope.PaternalFamilyTemp.country='';
           $scope.showPaternalFamily=true;
           $scope.isNewPaternalFamilyTemp=true;
		}
        $scope.closePaternalFamily = function (){
        	$scope.showPaternalFamily=false;
        }
        $scope.closePaternalFamilyWorkExperience = function (){
        	$scope.showPaternalFamilyWorkExperience=false;
        }
        $scope.addBlankPaternalFamilyInfo = function() {
        	$scope.userprofile.PaternalFamilyArray.push(angular.copy($scope.PaternalFamilyTemp));
        }
        /* end of storing paternal family info and work experiences */
        /* arrays and functions for maternal family members */
        /* initilizing variables */
        $scope.isNewMaternalFamily=true;
        $scope.editMaternalFamilyIndex=-1;
        $scope.showMaternalFamily=false;
        $scope.isNewMaternalFamilyWorkExperience=true;
        $scope.editMaternalFamilyWorkExperienceIndex=-1;
        $scope.showMaternalFamilyWorkExperience=false;
        $scope.MaternalFamilyTemp = {"relation":"","name":"","city":"","state":"","country":"","workType":"","workDescription":""};
        $scope.userprofile.MaternalFamilyArray =[
		  {"relation":"Uncle","name":"Devil","city":{'id':2,'name':"Fairbanks1"},"state":{'id':2,'name':"Alaska"},"country":{'id':1,'name':"USA"},"workType":"Business","workDesctiption":"dummy work desctiption"},	
		  {"relation":"Nephew","name":"Tanveer","city":{'id':2,'name':"Fairbanks1"},"state":{'id':2,'name':"Alaska"},"country":{'id':1,'name':"USA"},"workType":"Shopkeeper","workDesctiption":"dummty work desctiption 2"},	
		];
      	/* function for using add or edit user work experience */
        $scope.addMaternalFamily =  function(){
           if($scope.MaternalFamilyTemp.relation !='' && 
           	$scope.MaternalFamilyTemp.name !='' && 
           	$scope.MaternalFamilyTemp.city !='' 
           	&& $scope.MaternalFamilyTemp.state !='' 
           	&& $scope.MaternalFamilyTemp.country !='' ){
	           var relation=angular.copy($scope.MaternalFamilyTemp.relation);
	           var name=angular.copy($scope.MaternalFamilyTemp.name);
	           var city=angular.copy($scope.MaternalFamilyTemp.city);
	           var state=angular.copy($scope.MaternalFamilyTemp.state);
	           var country=angular.copy($scope.MaternalFamilyTemp.country);
	           if($scope.isNewMaternalFamily){
	           		$scope.userprofile.MaternalFamilyArray.push({"relation":relation,"name":name,
	           	"city":city,"state":state,"country":country});
	           } else {
	           		angular.copy($scope.MaternalFamilyTemp,$scope.userprofile.MaternalFamilyArray[$scope.editMaternalFamilyIndex]);
	           		$scope.editMaternalFamilyIndex=-1;
	           		$scope.isNewMaternalFamily=true;
	           }           
	           $scope.MaternalFamilyTemp.relation='';
	           $scope.MaternalFamilyTemp.name='';
	           $scope.MaternalFamilyTemp.city='';
	           $scope.MaternalFamilyTemp.state='';
	           $scope.MaternalFamilyTemp.country='';
	           $scope.showMaternalFamily= false;
           }
        }
        $scope.addMaternalFamilyWorkExperience =  function(){
           if($scope.MaternalFamilyTemp.workType !='' && $scope.MaternalFamilyTemp.workDescription !=''){
	           var workType=angular.copy($scope.MaternalFamilyTemp.workType);
	           var workDescription=angular.copy($scope.MaternalFamilyTemp.workDescription);
	           if($scope.isNewMaternalFamilyWorkExperience){
	           		$scope.userprofile.MaternalFamilyArray.push({"workType":workType,"workDescription":workDescription});
	           } else {
	           		angular.copy($scope.MaternalFamilyTemp,$scope.userprofile.MaternalFamilyArray[$scope.editMaternalFamilyWorkExperienceIndex]);
	           		$scope.editMaternalFamilyWorkExperienceIndex=-1;
	           		$scope.isNewMaternalFamilyWorkExperience=true;
	           }           
	           $scope.MaternalFamilyTemp.workType='';
	           $scope.MaternalFamilyTemp.workDescription='';
	           $scope.showMaternalFamilyWorkExperience= false;
           }
        }
        /* function is using for removing user work experience*/
        $scope.removeMaternalFamily = function(index) {
        	$scope.userprofile.MaternalFamilyArray.splice(index, 1);
		};
		/* function is using for filling values into form for editng and saving user work experience */
        $scope.editMaternalFamily = function(index){
        	$scope.editMaternalFamilyIndex=index;
        	$scope.isNewMaternalFamily=false;
        	$scope.showMaternalFamily=true;
        	angular.copy($scope.userprofile.MaternalFamilyArray[index],$scope.MaternalFamilyTemp);
        	$scope.editMaternalFamilyIndex=index;
        	$scope.isNewMaternalFamily=false;
        	$scope.showMaternalFamily=true;
        }
        $scope.editMaternalFamilyWorkExperience = function(index){
        	$scope.editMaternalFamilyWorkExperienceIndex=index;
        	$scope.isNewMaternalFamilyWorkExperienceisNewMaternalFamilyWorkExperience=false;
        	$scope.showMaternalFamilyWorkExperience=true;
        	angular.copy($scope.userprofile.MaternalFamilyArray[index],$scope.MaternalFamilyTemp);
        	$scope.editMaternalFamilyWorkExperienceIndex=index;
        	$scope.isNewMaternalFamilyWorkExperience=false;
        	$scope.showMaternalFamilyWorkExperience=true;
        }
        $scope.addNewMaternalFamily = function(index) {
        	   $scope.MaternalFamilyTemp.relation='';
	           $scope.MaternalFamilyTemp.name='';
	           $scope.MaternalFamilyTemp.city='';
	           $scope.MaternalFamilyTemp.state='';
	           $scope.MaternalFamilyTemp.country='';
	           $scope.showMaternalFamily=true;
	           $scope.isNewMaternalFamilyTemp=true;
		}
        $scope.closeMaternalFamily = function (){
        	$scope.showMaternalFamily=false;
        }
        $scope.closeMaternalFamilyWorkExperience = function (){
        	$scope.showMaternalFamilyWorkExperience=false;
        }
        $scope.addBlankMaternalFamilyInfo = function() {
        	$scope.userprofile.MaternalFamilyArray.push(angular.copy($scope.MaternalFamilyTemp));
        }
        /* end of storing maternal family info and work experiences */
		/*$scope.heightsArray = HeightService.getHeights();
		$scope.complexionArray = HeightService.getComplexions();*/
		/*$scope.heightsArray = [ "4.0","4.5","5","5.5","6","6.5"];*/
		$scope.heightsArray = [ 
			{"cm":137,"inch":"4' 6'' "},
			{"cm":140,"inch":"4' 7'' "},
			{"cm":142,"inch":"4' 8'' "},
			{"cm":145,"inch":"4' 9'' "},
			{"cm":147,"inch":"4' 10'' "},
			{"cm":150,"inch":"4' 11'' "},
			{"cm":152,"inch":"5' 0'' "},
			{"cm":155,"inch":"5' 1'' "},
			{"cm":157,"inch":"5' 2'' "},
			{"cm":160,"inch":"5' 3'' "},
			{"cm":163,"inch":"5' 4'' "},
			{"cm":165,"inch":"5' 5'' "},
			{"cm":168,"inch":"5' 6'' "},
			{"cm":170,"inch":"5' 7'' "},
			{"cm":173,"inch":"5' 8'' "},
			{"cm":175,"inch":"5' 9'' "},
			{"cm":178,"inch":"5' 10'' "},
			{"cm":180,"inch":"5' 11'' "},
			{"cm":183,"inch":"6' 0'' "},
			{"cm":185,"inch":"6' 1'' "},
			{"cm":188,"inch":"6' 2'' "},
			{"cm":191,"inch":"6' 3'' "},
			{"cm":193,"inch":"6' 4'' "},
			{"cm":195,"inch":"6' 5'' "},
			{"cm":198,"inch":"6' 6'' "},
			{"cm":201,"inch":"6' 7'' "},
			{"cm":203,"inch":"6' 8'' "},
			{"cm":205,"inch":"6' 9'' "},
			{"cm":208,"inch":"6' 10'' "},
			{"cm":210,"inch":"6' 11'' "},
			{"cm":213,"inch":"7' 0'' "},
		];
		$scope.complexionArray = [ "Fair","Dark","Brown","Wheatish","Light Brown","Dusky"];
		$scope.quantity = 4;
		/*$scope.moonsignArray =["Aries","Libra","Gemini","Cancer","Capricon","Virgo"];*/
		$scope.gotraArray =["Bhanot","Gojra","Garg"];
		$scope.castArray =["Saini","Jatt","Pandit","Rajpoots"];
		//$scope.relationArray = ['Father','Mother','Brother','Sister','Grandfater','Grandmother'];
		$scope.paternalRelationArray = ['Uncle','Cusion'];
		$scope.maternalRelationArray = ['Uncle','Niece','Nephew'];
		$scope.addedLanguages=[];
		$scope.addLanguage = function() {
			if($scope.userprofile.language){
				/*$scope.languages.push({'title': $scope.userprofile.language, 'done':false});*/
				$scope.userprofile.languages.push({'title': $scope.userprofile.language, 'done':false});
				$scope.addedLanguages.push($scope.userprofile.language);
				$scope.userprofile.language = '';
			}
		}
		$scope.deleteLanguage = function(index) {
			$scope.languages.splice(index, 1);
			$scope.userprofile.languages.splice(index, 1);
		}
		$scope.addedInterests=[];
		$scope.addInterest = function() {
			if($scope.userprofile.interest){
				/*$scope.interests.push({'title': $scope.userprofile.interest, 'done':false});*/
				$scope.userprofile.interests.push({'title': $scope.userprofile.interest, 'done':false});
				$scope.addedInterests.push($scope.userprofile.interest);
				//$scope.userprofile.interests.push({$scope.userprofile.interest});
				$scope.userprofile.interest = '';
			}
		}
		$scope.deleteInterest = function(index) {
			$scope.interests.splice(index, 1);
			$scope.userprofile.interests.splice(index, 1);
		}
		$scope.bloodgrouparray =["O+","O-","AB+","AB-","A+","A-","B+","B-"];
		$scope.dietarray =["Vegiterian","Non Vegiterian"];
		$scope.drinkarray =["Often","Socially","Not at all"];
		$scope.smokearray =["Yes","No","Sometimes"];
	   /*$scope.bloodgrouparray =[
			{"title":"O+","value":"opositive"},
			{"title":"O-","value":"onegitive"},
			{"title":"AB+","value":"abpositive"},
			{"title":"AB-","value":"abnegitive"},
			{"title":"A+","value":"apositive"},
			{"title":"A-","value":"anegitive"},
			{"title":"B+","value":"bpositive"},
			{"title":"B-","value":"bnegitive"},		
		];
		$scope.dietarray =[
			{"title":"Vegiterian","value":"vegiterian"},
			{"title":"Non Vegiterian","value":"nonvegiterian"},
		];
		$scope.drinkarray =[
			{"title":"Often","value":"often"},
			{"title":"Socially","value":"socially"},
			{"title":"Not at all","value":"notatall"},
		];
		$scope.smokearray =[
			{"title":"Yes","value":"yes"},
			{"title":"No","value":"no"},
			{"title":"Sometimes","value":"sometimes"},
		];*/
		$scope.closePopupOver = function () {
		  $scope.isOpen = false;  
		};
        $scope.inputType = 'password';	  
		$scope.hideShowPassword = function(){
			console.log("show hide password called ");
			if ($scope.inputType == 'password')
			  $scope.inputType = 'text';
			else
			  $scope.inputType = 'password';
		};
	}		
	/* End Biodata Controller*/	
	/* Start Location Service 
	angular.module('easybiodata')
	.factory("LocationService", ['$filter', 
		  function($filter){
			var service = {};
			var countrylist = [
				{ "id": 1, "country": "USA" },
				{ "id": 2, "country": "Canada" },
				{ "id": 3, "country": "India" },
			];
			var statelist = [
				{"id":1, "state":"Alaska", "countryId": 1},
				{"id":2, "state":"California1", "countryId":2},
				{"id":3, "state":"California4", "countryId": 3},
				{"id":4, "state":"Alaska1", "countryId": 1},
				{"id":5, "state":"California2", "countryId":2},
				{"id":6, "state":"California2", "countryId": 3},
			];
			var citylist = [
				{"id":1, "city":"Anchorage2", "stateId": 1},
				{"id":2, "city":"Fairbanks1", "stateId": 2},
				{"id":3, "city":"Fairbanks2", "stateId": 3},
				{"id":4, "city":"Fairbanks3", "stateId": 4},
				{"id":5, "city":"Fairbanks4", "stateId": 5},
				{"id":5, "city":"Fairbanks5", "stateId": 6},
			];
			service.getCountryName = function(countryId){ 
				//if(countryId>0){
					var singleCountrylist = ($filter('filter')(countrylist, {id: countryId}));
					return singleCountrylist[0].country;
				//}
			};
			service.getStateName = function(stateId){ 
				//if(stateId>0){
					var singleStatelist = ($filter('filter')(statelist, {id: stateId}));
					return singleStatelist[0].state;
				//}
			};
			service.getCityName = function(cityId){
				//if(cityId>0){
					var singleCitylist = ($filter('filter')(citylist, {id: cityId}));
					return singleCitylist[0].city;
				//}
			};
			service.getCountry = function(){ 
				return countrylist;
			};
			service.getCountryState = function(countryId){
				var states = ($filter('filter')(statelist, {countryId: countryId}));
				return states;
			};
			service.getStateCity = function(stateId){
				var cities = ($filter('filter')(citylist, {stateId: stateId}));      
				return cities;
			};
			return service;       
		}]);
	/* End Location Service */
	/* Start userService */
	angular.module('easybiodata')
    .service('userService', function () {
    	var user = {
    		dob: new Date('1989-04-26T09:00:00'),
    		profileSymbol: 'images/symbols/om.svg',
    		hasCar:false,
			hasHouse:false,
    	};
       /* var user ={
				CName: "Tanveer Singh",
		  		CPhone: "9998887771",
		  		CEmail: "tanveer@gmail.com",
				Image: "images/ProfilePic/profile-photo.jpg",
				RelativePhone: "9898989898",
				RelativeEmail: "tanveersingh@gmaill.com",
				relation:"Son",
				relativeRelation: "Father",
				RelativeName: "Jassa Singh",
				Phone: "9451234569",
				profileImage : "images/ProfilePic/profile-photo.jpg",
	  			fullName : "Tanveer singh",
	  			firstName : "Tanveer",
	  			lastName : "Singh",
	  			email : "tanveer@gmail.com", 
	  			phone : "",
	 			address : "Address",
				gender:"male",
	            country:{'id':1,'name':"USA"}, 
	            state: {"id":1, "name":"Alaska", "countryId": 1},
	            city: {'id':2,'name':"Fairbanks1"},
	            currentCountry:{'id':1,'name':"USA"}, 
	            currentState: {'id':1,'name':"Alaska"},
	            currentCity:{'id':2,'name':"Fairbanks1"},
	            moonsign:{"id":2,"name":"Taurus"},
			    hasCar:true,
			  	hasHouse:false,
			    AnnualIncome:"",
			    zodiac:{"id":5,"name":"Libra"},
			    isManglik:false,
			    height:"5",
			    complexion:"Fair",
			    religion:{"id":1,"name":"Hindu"},
				maritalStatus:"Single",
				/*bloodGroup:"O-",
				diet:"Vegitarian",
				drink:"Socially",
				smoke:"yes",
	            personalInformation:"this is dummy information for user peofile",
	            dob: new Date('1989-04-26T09:00:00'),
	            cast:"",
	            gotra: "",
	            profileTemplate:'',
	            profileSymbol: 'images/symbols/om.svg',
	            EducationDetails :  [
	            				    	{"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
         								{"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}}
								    ],
				WorkExperiences :   [
										{"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
								        {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
									],
	      };
	     /*var user ={
				CName: "Tanveer Singh",
		  		CPhone: "9998887771",
		  		CEmail: "tanveer@gmail.com",
				Image: "images/ProfilePic/profile-photo.jpg",
				RelativePhone: "9898989898",
				RelativeEmail: "tanveersingh@gmaill.com",
				relation:"Son",
				relativeRelation: "Father",
				RelativeName: "Jassa Singh",
				Phone: "9451234569",
				profileImage : "images/ProfilePic/profile-photo.jpg",
	  			fullName : "Tanveer singh",
	  			firstName : "Tanveer",
	  			lastName : "Singh",
	  			email : "tanveer@gmail.com", 
	  			phone : "",
	 			address : "Address",
				gender:"male",
	            country:{'id':1,'name':"USA"}, 
	            state: {"id":1, "name":"Alaska", "countryId": 1},
	            city: {'id':2,'name':"Fairbanks1"},
	            currentCountry:{'id':1,'name':"USA"}, 
	            currentState: {'id':1,'name':"Alaska"},
	            currentCity:{'id':2,'name':"Fairbanks1"},
	            moonsign:{"id":2,"name":"Taurus"},
			    hasCar:true,
			  	hasHouse:false,
			    AnnualIncome:"",
			    zodiac:{"id":5,"name":"Libra"},
			    isManglik:false,
			    height:"5",
			    complexion:"Fair",
			    religion:{"id":1,"name":"Hindu"},
				maritalStatus:"Single",
				bloodGroup:"O-",
				diet:"Vegitarian",
				drink:"Socially",
				smoke:"yes",
	            personalInformation:"this is dummy information for user peofile",
	            dob: new Date('1989-04-26T09:00:00'),
	            cast:"",
	            gotra: "",
	            profileTemplate:'',
	            profileSymbol: 'images/symbols/om.svg',
	            EducationDetails :  [
	            				    	{"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
         								{"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}}
								    ],
				WorkExperiences :   [
										{"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
								        {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
									],
	      };*/
         return {
            getUser: function () {
                return user;
            },
            setUser: function(value) {
                user = value;
            }
        };
    });
	/* End userService */
	/* Start kundaliService */
	angular.module('easybiodata')
	.service('kundaliService', function () {
        var kundali ={   };
	    /* var kundali ={
				longituteDegree: "15",
				longituteMinute: "3",
				longituteEw: "42",
				latitudeDegree: "74",
				latitudeMinute: "4",
				latitudeNs: "73",
				timezone: "22",
				dst: "ddr",
				kpHoraryNo: "2323423",
				ayanamsa: "ayanamsa testing",
				chartStyle: "chart style",
	    };*/
        return {
            getUserKundali: function () {
                return angular.copy(kundali);
            },
            setUserKundali: function(value) {
                kundali = angular.copy(value);
            }
        };
    });
	/* End kundaliService */
	/* Start Income Service 
	angular.module('easybiodata')
	.factory("IncomeService", ['$filter', 
		  function($filter){
			var service = {};     
			var incomesList = [ "No Income","Rs 0 - 1 Lakh","Rs 1 - 2 Lakhs", "Above 10 Lakhs"];
			service.getIncomes = function(){ 
				return incomesList;
			};
			return service;       
	}]);
	/* End Income Service */
	/* Start zodiac Service 
	angular.module('easybiodata')
	.factory("ZodiacService", ['$filter', 
		  function($filter){
			var service = {};     
			var zodiacList = [ "Aries","Taurus","Gemini","Cancer","Libra","Virgo","Leo","Scorpio","Saggitarrius","Aquarius","Pisces","Capricon"];
			service.getZodiacs = function(){ 
				return zodiacList;
			};
			return service;       
		}]);
	/* End zodiac Service */
	
	/* Start zodiac Service 
	angular.module('easybiodata')
	.factory("HeightService", ['$filter', 
		  function($filter){

			var service = {};     

			var heightList = [ "4.5","5","5.5","6"];
			var complexionList = [ "4.5","5","5.5","6"];
			  
			service.getHeights = function(){ 
				return heightList;
			};
			service.getComplexions = function(){ 
				return complexionList;
			};
			return service;       
		}]);
	/* End zodiac Service */
	
	
	/* Start Religion Service 
	angular.module('easybiodata')
	.factory("ReligionService", ['$filter', 
		  function($filter){

			var service = {};     

			var religionList = [
				{ "id": 1, "name": "Hindu" },
				{ "id": 2, "name": "Sikh" },
				{ "id": 3, "name": "Muslim" },
			];
			  
			service.getReligion = function() { 
				return religionList;
			};
			  
			return service;       
		}]);
	/* End Religion Service */
	
	
	/* Start Merital Status Service 
		angular.module('easybiodata').factory("MaritalStatusService", ['$filter', 
		  function($filter){
			var service = {};     
			var meritalStatusList = ["Marital Status","Single","Merid","Devorced","Widow"];
			service.getMeritalStatues = function(){ 
				return meritalStatusList;
			};
			  
			return service;       
		}]);
	/* End Merital Status Service */
	
	/*app.directive('compareTo', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {

				var me = attrs.ngModel;
				var compareTo = attrs.compareTo;

				scope.$watch('[me, compareTo]', function(value){
					ctrl.$setValidity('compareTo', scope[me] === scope[compareTo] );
				});

            }
        }
    }]);*/

	/* End of Directive to for password or email match */

	/* Start of Directive for Phone number validation */
	/*var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
	app.directive('phone', function() {
	    return {
	        restrice: 'A',
	        require: 'ngModel',
	        link: function(scope, element, attrs, ctrl) {
	            angular.element(element).bind('blur', function() {
	                var value = this.value;
	                if(PHONE_REGEXP.test(value)) {
	                    // Valid input
	                    console.log("valid phone number");
	                   // angular.element(this).next().next().css('display','none');  
	                } else {
	                    // Invalid input  
	                    console.log("invalid phone number");
	                   // angular.element(this).next().next().css('display','block');
	                    /* 
	                        Looks like at this point ctrl is not available,
	                        so I can't user the following method to display the error node:
	                        ctrl.$setValidity('currencyField', false); 
	                    */                    
	                /*}
	            });              
	        }            
	    }        
	});


	/* End of Drictive for Phone number validation */



	/* focus an element in angular way */
	app.factory('focus', function($timeout, $window) {
	    return function(id) {
	      // timeout makes sure that is invoked after any other event has been triggered.
	      // e.g. click events that need to run before the focus or
	      // inputs elements that are in a disabled state but are enabled when those events
	      // are triggered.
	      $timeout(function() {
	        var element = $window.document.getElementById(id);
	       // console.log('directive called focus');
	        if(element)
	          element.focus();
	      },200);
	    };
	  }).directive('eventFocus', function($timeout,focus) {
	    return function(scope, elem, attr) {
	      elem.on(attr.eventFocus, function() {
	        focus(attr.eventFocusId);
	      });
	           
	      // Removes bound events in the element itself
	      // when the scope is destroyed
	      /*scope.$on('$destroy', function() {
	        elem.off(attr.eventFocus);
	      });*/
	    };
	  });

  	/* end of focus an element in angular way */
			
})();

