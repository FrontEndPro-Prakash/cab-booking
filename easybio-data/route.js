(function(){
'use strict';
/* 
	implemented ui-router to direct user to correct page on based of url.
*/
app.config(function($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider) {
	/*var isMobile = (function() {
        var check = false;
	        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	        console.log("isMobile: "+check);
	        return check;

    })();*/
	$urlRouterProvider.otherwise('/');		
		$stateProvider			
			//Home Page
			.state('home', {
				url:'/',
				templateUrl:'templates/home/home.html',
				controller:'successStoryController',
			})
			//Home Page Sample Biodata	
			.state('biodataSample', {
				url:'/biodata-sample',
				templateUrl:'templateUrlplates/home/biodata-sample.html',
				authenticate: false,
			})
			//Home Page Forgot Password	
			.state('forgotPassword', {
				url:'/forgot-password',
				templateUrl:'templates/home/forgot-password.html',
				authenticate: false,
			})
			//Home Page Reset Password	
			.state('resetPassword', {
				url:'/reset-password',
				templateUrl:'templates/home/reset-password.html',
				authenticate: false,
			})
			//Home Page Success Password	
			.state('successPassword', {
				url:'/success-password',
				templateUrl:'templates/home/success-password.html',
				authenticate: true,
			})
			//Create Biodata Page	
			.state('createBiodata', {
				url:'/create-biodata',
				templateUrl: 'templates/biodata/create-biodata.html',
				controller:'CreateBiodataController',
				authenticate: true,
				resolve: {
				  profile: ['BiodataService','localStorageService', function(BiodataService,localStorageService) {
			        return BiodataService.get({'id':localStorageService.get('profileId')}).$promise;
			      }],
			      user: ['AccountService','localStorageService', function(AccountService,localStorageService) {
			        return AccountService.get({'id':localStorageService.get('userId')}).$promise;
			      }],
			      religions: ['ReligionService','localStorageService', function(ReligionService,localStorageService) {
			        return ReligionService.get().$promise;
			      }],
			      religionSymbols: ['ReligionSymbolService','localStorageService', function(ReligionSymbolService,localStorageService) {
			        return ReligionSymbolService.get().$promise;
			      }],
			      educationLevels: ['EducationLevelsService','localStorageService', function(EducationLevelsService,localStorageService) {
			        return EducationLevelsService.get().$promise;
			      }],
			      familyRelations: ['FamilyRelationsService','localStorageService', function(FamilyRelationsService,localStorageService	) {
			       /* console.log(FamilyRelationsService.get()); */
			        return FamilyRelationsService.get().$promise;
			      }],
			    },
			})
			//Create Biodata Page ShareBiodata	
			.state('shareBiodata', {
				url:'/share-biodata',
				templateUrl:'templates/biodata/share-biodata.html',
				authenticate: true,
			})
			//Create Biodata Mobile Edit Page	
			.state('createBiodataMobileEdit', {
				url:'/edit-create-biodata',
				templateUrl:'templates/biodata/create-biodata-edit-mobile.html',
				authenticate:false,
				/*controller: ['$stateParams','$rootScope','QueryStringService',function($stateParams,$scope,QueryStringService){
					console.log($stateParams.currentTab);
			        setTimeout(function(){
			        		var getQueryStrings = QueryStringService.getFilters();
			        		console.log(getQueryStrings);
			        		if($stateParams.currentTab=='personal'){
								jQuery('#personalTabMobile').click();
							//	jQuery('html, body').animate({scrollTop:$('#personalTabMobile').position().top}, 1);
							} else if($stateParams.currentTab=='education'){
								jQuery('#educationTabMobile').click();
							//	jQuery('html, body').animate({scrollTop:$('#educationTabMobile').position().top}, 1);
							} else if($stateParams.currentTab=='work'){
								jQuery('#workTabMobile').click();
								//jQuery('html, body').animate({scrollTop:$('#workTabMobile').position().top}, 1);
							} else if($stateParams.currentTab=='family'){
								jQuery('#familyTabMobile').click();
								//jQuery('html, body').animate({scrollTop:$('#familyTabMobile').position().top}, 1);
							} else if($stateParams.currentTab=='photo'){
								jQuery('#photoTabMobile').click();
							//	jQuery('html, body').animate({scrollTop:$('#photoTabMobile').position().top}, 1);
							} else {
								jQuery('#personalTabMobile').click();
							//	jQuery('html, body').animate({scrollTop:$('#personalTabMobile').position().top}, 1);
							}
					},1);
			    }],
			    resolve:{
			        currentTab: ['$stateParams', function($stateParams){
			          return $stateParams.currentTab;
			        }]
			    }*/
			})
			//Create Biodata Mobile Preview Page	
			.state('createBiodataMobilePreview', {
				url:'/preview-create-biodata',
				templateUrl:'templates/biodata/create-biodata-preview-mobile.html',
				authenticate:false,
				controller:'BiodataController',
			})
			//Create Biodata Mobile Kundali Page	
			.state('createBiodataMobileKundali', {
				url:'/preview-kundali',
				templateUrl:'templates/biodata/kundali-mobile.html',
				authenticate:false,
			})
			//Create Biodata Mobile Coordinate Page	
			.state('createBiodataMobileCoordinate', {
				url:'/coordinate-advance-setting',
				templateUrl:'templates/biodata/coordinate-advance-setting-mobile.html',
				authenticate:false,
			})
			//Create Biodata Mobile Choose Template Page	
			.state('createBiodataMobileTemplateSymbol', {
				url:'/choose-template-symbol',
				templateUrl:'templates/biodata/choose-template-symbol-mobile.html',
				authenticate:false,
			})
			//Create Biodata Mobile Form Page	
			.state('createBiodataMobileForm', {
				url:'/create-biodata-form',
				templateUrl:'templates/biodata/create-bioDataForm-mobile.html',
				authenticate:false,
			})
			//Create Biodata Mobile FAQ Page	
			.state('faqRelationManagerMobile', {
				url:'/faq-relation-maneger',
				templateUrl:'templates/biodata/faq-relationManeger-mobile.html',
				authenticate:false,
			})	
			//Create Biodata Mobile potential Page	
			.state('potentialSpouseMobile', {
				url:'/potential-spouse',
				templateUrl:'templates/biodata/potential-spouse-mobile.html',
				authenticate:false,
			})
			//Create Biodata Mobile Upload Photo Page	
			.state('uploadPhotoMobile', {
				url:'/upload-photo',
				templateUrl:'templates/biodata/upload-photo-mobile.html',
				authenticate:false,
			})
			//Help Page	
			.state('help', {
				url:'/help',
				templateUrl:'templates/help/help.html',
				authenticate: false,
			})
			//Help Detail Page	
			.state('helpDetail', {
				url:'/help-detail',
				templateUrl:'templates/help/help-detail.html',
				authenticate: false,
			})
			//Dashboard	Page
			.state('dashboard', {
				url:'/dashboard',
				templateUrl:'templates/dashboard/dashboard.html',
				authenticate: true,
				controller:"DashboardController",
				resolve:{
				    subscriptionPlans: ['SubscriptionPlansServices','localStorageService', function(SubscriptionPlansServices,localStorageService) {
				        return SubscriptionPlansServices.get().$promise;
				    }],
				    userSubscriptionPlans: ['UserSubscriptionService','localStorageService', function(UserSubscriptionService,localStorageService) {
				        return UserSubscriptionService.get({'id':localStorageService.get('userId')}).$promise;
				    }],
				    userPayments: ['UserPaymentsService','localStorageService', function(UserPaymentsService,localStorageService) {
				        return UserPaymentsService.get({'id':localStorageService.get('userId')}).$promise;
				    }],
				}
				/*resolve: {
			      user: ['AccountService','localStorageService', function(AccountService,localStorageService) {
			        return AccountService.get({'id':localStorageService.get('userId')}).$promise;
			      }]
			    },*/
			})
			//Dashboard	Page Manage Subscription
			.state('manageSubscription', {
				url:'/manage-subscription',
				templateUrl:'templates/dashboard/manage-subscription.html',
				controller:"DashboardController",
				authenticate:true,
				resolve:{
					subscriptionPlans: ['SubscriptionPlansServices','localStorageService', function(SubscriptionPlansServices,localStorageService) {
				        return SubscriptionPlansServices.get().$promise;
				    }],
				    userSubscriptionPlans: ['UserSubscriptionService','localStorageService', function(UserSubscriptionService,localStorageService) {
				        return UserSubscriptionService.get({'id':localStorageService.get('userId')}).$promise;
				    }],
				    userPayments: ['UserPaymentsService','localStorageService', function(UserPaymentsService,localStorageService) {
				        return UserPaymentsService.get({'id':localStorageService.get('userId')}).$promise;
				    }],
				}
			})
			//Dashboard	Full Biodata Preview
			.state('fullBiodataMobile', {
				url:'/full-biodata-preview',
				templateUrl:'templates/dashboard/full-biodata-preview-mobile.html',
				authenticate:false,
			})
			//Membership Page
			.state('membership', {
				url:'/membership',
				templateUrl:'templates/membership/membership.html',
				authenticate:true,
				controller:"MembershipController",
				resolve: {
					subscriptionPlans: ['SubscriptionPlansServices','localStorageService', function(SubscriptionPlansServices,localStorageService) {
				        return SubscriptionPlansServices.get().$promise;
				    }],
				    userSubscriptionPlans: ['UserSubscriptionService','localStorageService', function(UserSubscriptionService,localStorageService) {
				        return UserSubscriptionService.get({'id':localStorageService.get('userId')}).$promise;
				    }],
				}
			})
			//Membership Share Form Page
			.state('shareBiodataForm', {
				url:'/share-biodata-form',
				templateUrl:'templates/membership/share-biodata-form-mobile.html',
				authenticate:false,
			})
			//Membership Page Plan
			.state('membershipPlan', {
				url:'/membership-plan',
				templateUrl:'templates/membership/membership-plan.html',
				authenticate:false,
			})
			//Membership Page Purchase Thanks
			.state('membershipPurchaseThanks', {
				url:'/membership-purchase-thanks',
				templateUrl:'templates/membership/membership-purchase-thanks.html',
				authenticate:false,
			})
			//Membership Page Share Thanks
			.state('membershipShareThanks', {
				url:'/membership-share-thanks',
				templateUrl:'templates/membership/membership-share-thanks.html',
				authenticate:false,
			})
			//Payment Page
			.state('payment', {
				url:'/payment',
				templateUrl:'templates/payment/payment.html',
				authenticate:true,
				resolve:{
					upgradePlan: ['localStorageService','$state', function(localStorageService,$state) {
						$state.go('manageSubscription');
				        return localStorageService.get('upgradePlan').$promise;
				    }],
				}

			})
			//Contact Us Page
			.state('contactUs', {
				url:'/contact-us',
				templateUrl:'templates/contact/contact-us.html',
				authenticate: false,
			})
			//About Us Page
			.state('aboutUs', {
				url:'/about-us',
				templateUrl:'templates/about/about-us.html',
				authenticate:false,
			})
			//My Account Page
			/*.state('myAccount', {
				url:'/my-account',
				authenticate:false,
				controller: 'AccountController as AccountController',
				templateUrl:'templates/account/my-account.html',
		        resolve: {
		            user: function(AccountService,$state) {
		                if(AccountService.get({'id':1})){
		                	return AccountService.get({'id':1});
		                } else {
		                		$stateProvider.go('home');
		                }
		            }
		        }

			})*/
			.state('myAccount', {
			    url: '/my-account',
			    authenticate:true,
			    templateUrl:'templates/account/my-account.html',
			    resolve: {
			      user: ['AccountService','localStorageService', function(AccountService,localStorageService) {
			        return AccountService.get({'id':localStorageService.get('userId')}).$promise;
			      }]
			    },
			    controller: 'AccountController',
			})

			//Deactive Account Mobile Page
			.state('deactiveAccountMobile', {
				url:'/deactive-account',
				templateUrl:'templates/account/deactive-account-mobile.html',
				authenticate:true,
			})
			//Privacy Policy Page
			.state('privacyPolicy', {
				url:'/privacy-policy',
				templateUrl:'templates/privacy-policy.html',
				authenticate:false,
			})
			//How Make Biodata Page
			.state('howMakeBiodata', {
				url:'/how-make-biodata',
				templateUrl:'templates/how-make-biodata.html',
				authenticate:false,
			})
			//Terms Condition Page
			.state('termsCondition', {
				url:'/terms-condition',
				templateUrl:'templates/terms-condition.html',
				authenticate:false,
			})

			$httpProvider.interceptors.push('authInterceptor');
			$httpProvider.interceptors.push('authExpiredInterceptor');
			/*$locationProvider.html5Mode({
			  enabled: true,
			  requireBase: false
			});*/
			//$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});

})();