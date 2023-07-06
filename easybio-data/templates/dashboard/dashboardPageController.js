(function(){
'use strict';

app.controller('DashboardController', DashboardController);
DashboardController.$inject = ['$scope','userService','UserSubscriptionService','userSubscriptionPlans','userPayments','subscriptionPlans','localStorageService','$state','$filter','$timeout'];
function DashboardController($scope,userService,UserSubscriptionService,userSubscriptionPlans,userPayments,subscriptionPlans,localStorageService,$state,$filter,$timeout) {

	/* my code */
	//$scope.user={};
	//$scope.user = user.data;

	/* my code */
	function init() {
		$scope.userSubscriptionPlans = userSubscriptionPlans.data;
		$scope.subscriptionPlans = subscriptionPlans.data;
		$scope.userPayments = userPayments.data;
		if(angular.isDefined($scope.userSubscriptionPlans.validUntil) && $scope.userSubscriptionPlans.validUntil != '') {
			var d1 = moment($filter('date')($scope.userSubscriptionPlans.validUntil, "MM/dd/yyyy"));
			var d2 = moment($filter('date')(new Date(), "MM/dd/yyyy"));
			var days = moment.duration(d1.diff(d2));
			$scope.subscriptionExpireinDays = days.asDays();
			$scope.subscriptionExpireDate =$scope.userSubscriptionPlans.validUntil;
			$scope.showExpiryMessage=false;
		} else {
			$scope.showExpiryMessage=true;
		}

		//localStorageService.set('paymentSuccess',true);
		//localStorageService.set('newPlan',userSubscriptionPlans.data);	
		//$scope.paymentSuccess=true;
		//console.log(localStorageService.get('paymentSuccess'));
		//console.log(localStorageService.get('newPlan'));
		$scope.paymentSuccess = localStorageService.get('paymentSuccess');
		$scope.newPlan=='';
		if(localStorageService.get('newPlan')) {
			$scope.newPlan = localStorageService.get('newPlan');
		}
		if($scope.paymentSuccess && angular.isDefined($scope.newPlan) && $scope.newPlan != '') {
			$scope.newPlan = $filter('filter')(subscriptionPlans.data, function (d) {return d.id === $scope.newPlan.subscriptionPlanId;})[0];
			localStorageService.set('paymentSuccess',false);
		} else {
			$scope.newPlan={};
			$scope.newPlan.name="";
			localStorageService.set('paymentSuccess',false);
		}
		
		/*$scope.paymentSuccess = false;
		if(localStorageService.get('paymentSuccess')){
			console.log('payment success');
			$scope.paymentSuccess = true;
		} else {
			console.log('payment not success');
			localStorageService.get('paymentSuccess',false);
			$scope.paymentSuccess = false;
		}*/

        /*function dayDiff(firstDate,secondDate){
	      var date2 = new Date(formatString(secondDate));
	      var date1 = new Date(formatString(firstDate));
	      var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
	      var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
	      return $dayDifference;
	 	}
		function formatString(format) {
		    var day   = parseInt(format.substring(0,2));
		    var month  = parseInt(format.substring(3,5));
		    var year   = parseInt(format.substring(6,10));
		    var date = new Date(year, month-1, day);
		    return date;
		}
		var currentDate = new Date();*/
		//console.log(dayDiff($scope.userSubscriptionPlans.validUntil,currentDate));
		//console.log($scope.userSubscriptionPlans);
	}
	init();
	$scope.upgradeSubscription = function(changePlan){
		var upgradePlan = {};
		upgradePlan.id = localStorageService.get('userId');
		upgradePlan.user = localStorageService.get('userId');
		upgradePlan.subscriptionPlanId = changePlan.id;
		upgradePlan.priceCents = changePlan.priceCents;
		/*upgradePlan.isActive = true;
		upgradePlan.validUntil = 'Thu, 16 Jun 2016 21:12:57 GMT';*/
		localStorageService.set('upgradePlan',upgradePlan);
		$state.go('payment');
		 //UserSubscriptionService.update(upgradePlan).$promise.then(function(response) { }); 
	}

	$scope.openDeclineStepOne = function(){
		$('#declineStepOne').modal('show');
	}
	$scope.openBiodataAnotherPerson = function(){
		$('#biodataAnotherPerson').modal('show');
	}
	$scope.RecommendedPic = "images/recommended-pic.jpg";
	$scope.RecommendedOwnerPic = "images/ProfilePic/profile-photo.jpg";
	$scope.RecommendedHistory = "http://google.com/";
	$scope.RecommendedName = "Neha Garg ";
	$scope.RecommendUser = "Amit Shrivastav";
	$scope.RecommendprofieOwner = "Tanveer singh";
	$scope.RecommendMatchName = "Pooja Ramalingham";
	$scope.RecommendMatchLocation = "Mumbai";
	$scope.RecommendPercent = "XXX";
	
	$scope.MatchingItems =[
		{"MatchingItemPic":"images/user-pic-132x132-1.png",
		 "MatchingItemAge":"27",
		 "MatchingItemPlace":"Chandigarh"
		},
		{"MatchingItemPic":"images/user-pic-132x132-4.png",
		 "MatchingItemAge":"25",
		 "MatchingItemPlace":"Dehradun",
		},
		{"MatchingItemPic":"images/user-pic-132x132-1.png",
		 "MatchingItemAge":"30",
		 "MatchingItemPlace":"Chandigarh",
		}
	];
	
	$scope.indexToShow = 0;
	$scope.matchingUsers = [
					{
						id:1,
						CName: "Sonu",
				  		CPhone: "9898989898",
				  		CEmail: "sonu@gmail.com",
						RelativeName: "Mohinder singh",
						Image: "images/ProfilePic/profile-photo.jpg",
						RelativePhone: "9898989898",
						RelativeEmail: "tanveersingh@gmaill.com",
						RelativeRelation: "Father",
						RelativeName: "Sukha singh",
						Phone: "9451234569",
						profileImage : "images/ProfilePic/profile-photo.jpg",
			  			fullName : "Tanveer singh",
			  			firstName : "Tanveer",
			  			lastName : "Singh",
			  			email : "tanveer@gmail.com", 
			  			phone : "+91-123456789",
			 			address : "Address",
						sex:"male",
			            Country:{'id':1,'name':"USA"}, 
			            State: {'id':1,'name':"Alaska"}, 
			            City: {'id':2,'name':"Fairbanks1"},
			            CurrentCountry:{'id':1,'name':"USA"}, 
			            CurrentState: {'id':1,'name':"Alaska"},
			            CurrentCity:{'id':2,'name':"Fairbanks1"},
			            moonsign:"Aries",
					    hasCar:true,
					  	hasHouse:true,
					    AnnualIncome:"No Income",
					    zodiac:"Aries",
					    isManglik:false,
					    height:"5",
					    complexion:"5.5",
					    religion:{"id":1,"religion":"Hindu"},
						maritalStatus:"Single",
						/*bloodGroup:"O-",
						diet:"Vegitarian",
						drink:"Socially",
						smoke:"yes",*/
			            personalInformation:"this is dummy information for user1",
			            dob: "23 Mar, 1989",
			            cast:"",
			            gotra: "Gotra",
			            profileTemplate:'',
			            profileSymbol: 'images/symbols/om.svg',
			            EducationDetails :  [
	            				    	{"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
         								{"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}}
								    ],
						WorkExperiences : [
						  {"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
				          {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
						],
			      },
			      {
			      		id:2,
						CName: "Karandeep",
				  		CPhone: "8998989898989",
				  		CEmail: "karandeep@gmail.com",
						RelativeName: "Tanveer singh",
						Image: "images/ProfilePic/profile-photo.jpg",
						RelativePhone: "9898989898",
						RelativeEmail: "tanveersingh@gmaill.com",
						RelativeRelation: "Father",
						RelativeName: "Jassa Singh",
						Phone: "9451234569",
						profileImage : "images/ProfilePic/profile-photo.jpg",
			  			fullName : "Tanveer singh",
			  			firstName : "Tanveer",
			  			lastName : "Singh",
			  			email : "tanveer@gmail.com", 
			  			phone : "+91-123456789",
			 			address : "Address",
						sex:"male",
			            Country:{'id':1,'name':"USA"}, 
			            State: {'id':1,'name':"Alaska"}, 
			            City: {'id':2,'name':"Fairbanks1"},
			            CurrentCountry:{'id':1,'name':"USA"}, 
			            CurrentState: {'id':1,'name':"Alaska"},
			            CurrentCity:{'id':2,'name':"Fairbanks1"},
			            moonsign:"Aries",
					    hasCar:true,
					  	hasHouse:true,
					    AnnualIncome:"No Income",
					    zodiac:"Aries",
					    isManglik:false,
					    height:"5",
					    complexion:"5.5",
					    religion:{"id":1,"religion":"Hindu"},
						maritalStatus:"Single",
						/*bloodGroup:"O-",
						diet:"Vegitarian",
						drink:"Socially",
						smoke:"yes",*/
			            personalInformation:"this is dummy information for user",
			            dob: "",
			            cast:"",
			            gotra: "Gotra",
			            profileTemplate:'',
			            profileSymbol: 'images/symbols/om.svg',
			            EducationDetails :  [
	            				    	{"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
         								{"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}}
								    ],
						WorkExperiences : [
						  {"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
				          {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
						],

			      },
			      {
			      		id:3,
						CName: "Parminter",
				  		CPhone: "4646456445646456",
				  		CEmail: "parminder@gmail.com",
						RelativeName: "Tanveer singh",
						Image: "images/ProfilePic/profile-photo.jpg",
						RelativePhone: "9898989898",
						RelativeEmail: "tanveersingh@gmaill.com",
						RelativeRelation: "Father",
						RelativeName: "Jassa Singh",
						Phone: "9451234569",
						profileImage : "images/ProfilePic/profile-photo.jpg",
			  			fullName : "Tanveer singh",
			  			firstName : "Tanveer",
			  			lastName : "Singh",
			  			email : "tanveer@gmail.com", 
			  			phone : "+91-123456789",
			 			address : "Address",
						sex:"male",
			            Country:{'id':1,'name':"USA"}, 
			            State: {'id':1,'name':"Alaska"}, 
			            City: {'id':2,'name':"Fairbanks1"},
			            CurrentCountry:{'id':1,'name':"USA"}, 
			            CurrentState: {'id':1,'name':"Alaska"},
			            CurrentCity:{'id':2,'name':"Fairbanks1"},
			            moonsign:"Aries",
					    hasCar:true,
					  	hasHouse:true,
					    AnnualIncome:"No Income",
					    zodiac:"Aries",
					    isManglik:false,
					    height:"5",
					    complexion:"5.5",
					    religion:{"id":1,"religion":"Hindu"},
						maritalStatus:"Single",
						/*bloodGroup:"O-",
						diet:"Vegitarian",
						drink:"Socially",
						smoke:"yes",*/
			            personalInformation:"this is dummy information for user",
			            dob: "",
			            cast:"",
			            gotra: "Gotra",
			            profileTemplate:'',
			            profileSymbol: 'images/symbols/om.svg',
			            EducationDetails :  [
	            				    	{"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
         								{"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}}
								    ],
						WorkExperiences : [
						  {"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
				          {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
						],
			      },
			      {
			      		id:4,
						CName: "Harman",
				  		CPhone: "4654564646",
				  		CEmail: "harmanjeet@gmail.com",
						RelativeName: "Tanveer singh",
						Image: "images/ProfilePic/profile-photo.jpg",
						RelativePhone: "9898989898",
						RelativeEmail: "tanveersingh@gmaill.com",
						RelativeRelation: "Father",
						RelativeName: "Jassa Singh",
						Phone: "9451234569",
						profileImage : "images/ProfilePic/profile-photo.jpg",
			  			fullName : "Tanveer singh",
			  			firstName : "Tanveer",
			  			lastName : "Singh",
			  			email : "tanveer@gmail.com", 
			  			phone : "+91-123456789",
			 			address : "Address",
						sex:"male",
			            Country:{'id':1,'name':"USA"}, 
			            State: {'id':1,'name':"Alaska"}, 
			            City: {'id':2,'name':"Fairbanks1"},
			            CurrentCountry:{'id':1,'name':"USA"}, 
			            CurrentState: {'id':1,'name':"Alaska"},
			            CurrentCity:{'id':2,'name':"Fairbanks1"},
			            moonsign:"Aries",
					    hasCar:true,
					  	hasHouse:true,
					    AnnualIncome:"No Income",
					    zodiac:"Aries",
					    isManglik:false,
					    height:"5",
					    complexion:"5.5",
					    religion:{"id":1,"religion":"Hindu"},
						maritalStatus:"Single",
						/*bloodGroup:"O-",
						diet:"Vegitarian",
						drink:"Socially",
						smoke:"yes",*/
			            personalInformation:"this is dummy information for user",
			            dob: "",
			            cast:"",
			            gotra: "Gotra",
			            profileTemplate:'',
			            profileSymbol: 'images/symbols/om.svg',
			            EducationDetails :  [
	            				    	{"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
         								{"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}}
								    ],
						WorkExperiences : [
						  {"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
				          {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
						],
			      },
			      {
			      		id:5,
						CName: "balwinder",
				  		CPhone: "64564646544",
				  		CEmail: "balwindesingh@gmail.com",
						RelativeName: "Tanveer singh",
						Image: "images/ProfilePic/profile-photo.jpg",
						RelativePhone: "9898989898",
						RelativeEmail: "tanveersingh@gmaill.com",
						RelativeRelation: "Father",
						RelativeName: "Jassa Singh",
						Phone: "9451234569",
						profileImage : "images/ProfilePic/profile-photo.jpg",
			  			fullName : "Tanveer singh",
			  			firstName : "Tanveer",
			  			lastName : "Singh",
			  			email : "tanveer@gmail.com", 
			  			phone : "+91-123456789",
			 			address : "Address",
						sex:"male",
			            Country:{'id':1,'name':"USA"}, 
			            State: {'id':1,'name':"Alaska"}, 
			            City: {'id':2,'name':"Fairbanks1"},
			            CurrentCountry:{'id':1,'name':"USA"}, 
			            CurrentState: {'id':1,'name':"Alaska"},
			            CurrentCity:{'id':2,'name':"Fairbanks1"},
			            moonsign:"Aries",
					    hasCar:true,
					  	hasHouse:true,
					    AnnualIncome:"No Income",
					    zodiac:"Aries",
					    isManglik:false,
					    height:"5",
					    complexion:"5.5",
					    religion:{"id":1,"religion":"Hindu"},
						maritalStatus:"Single",
						/*bloodGroup:"O-",
						diet:"Vegitarian",
						drink:"Socially",
						smoke:"yes",*/
			            personalInformation:"this is dummy information for user",
			            dob: "",
			            cast:"",
			            gotra: "Gotra",
			            profileTemplate:'',
			            profileSymbol: 'images/symbols/om.svg',
			            EducationDetails :  [
	            				    	{"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
         								{"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}}
								    ],
						WorkExperiences : [
						  {"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
				          {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
						],
			      },
			      {
			      		id:6,
						CName: "Mohd rafi",
				  		CPhone: "465464645",
				  		CEmail: "rafiabdal@gmail.com",
						RelativeName: "Tanveer singh",
						Image: "images/ProfilePic/profile-photo.jpg",
						RelativePhone: "9898989898",
						RelativeEmail: "tanveersingh@gmaill.com",
						RelativeRelation: "Father",
						RelativeName: "Jassa Singh",
						Phone: "9451234569",
						profileImage : "images/ProfilePic/profile-photo.jpg",
			  			fullName : "Tanveer singh",
			  			firstName : "Tanveer",
			  			lastName : "Singh",
			  			email : "tanveer@gmail.com", 
			  			phone : "+91-123456789",
			 			address : "Address",
						sex:"male",
			            Country:{'id':1,'name':"USA"}, 
			            State: {'id':1,'name':"Alaska"}, 
			            City: {'id':2,'name':"Fairbanks1"},
			            CurrentCountry:{'id':1,'name':"USA"}, 
			            CurrentState: {'id':1,'name':"Alaska"},
			            CurrentCity:{'id':2,'name':"Fairbanks1"},
			            moonsign:"Aries",
					    hasCar:true,
					  	hasHouse:true,
					    AnnualIncome:"No Income",
					    zodiac:"Aries",
					    isManglik:false,
					    height:"5",
					    complexion:"5.5",
					    religion:{"id":1,"religion":"Hindu"},
						maritalStatus:"Single",
						/*bloodGroup:"O-",
						diet:"Vegitarian",
						drink:"Socially",
						smoke:"yes",*/
			            personalInformation:"this is dummy information for user",
			            dob: "",
			            cast:"",
			            gotra: "Gotra",
			            profileTemplate:'',
			            profileSymbol: 'images/symbols/om.svg',
			            EducationDetails :  [
    				    	{"schoolUniversity":"GNDU","level":"Masters","year":"2012","typeOfDegree":{"id":7, "name":"B.com"}},	
							{"schoolUniversity":"PU","level":"Graduation","year":"2011","typeOfDegree":{"id":10, "name":"MA Hindi"}}
						],
						WorkExperiences : [
							{"companyName":"Think360","title":"Php Developer","city":"Chandigarh","description":"experience 2.2 years"},	
					        {"companyName":"NexZen Techonology","title":"Php Developer","city":"Chandigarh","description":"2 years"},
						],
			      },
			];
	$scope.user=userService.getUser();
	$scope.next = function(){
		$scope.indexToShow = ($scope.indexToShow + 1) % $scope.matchingUsers.length;
		console.log('current index: '+$scope.indexToShow);
	};
	$scope.previous = function(){	
		if($scope.indexToShow>=1){
			$scope.indexToShow = ($scope.indexToShow - 1) % $scope.matchingUsers.length;
		} else if($scope.indexToShow<2){
			$scope.indexToShow = $scope.matchingUsers.length-1;
		}
		console.log('current index: '+$scope.indexToShow);
	};
	    
    $scope.tab = 1;

    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
        console.log('tab setting');
    };

    $scope.isSet = function (tabId) {
 	    console.log('checking tab');
        return $scope.tab === tabId;
    };
}
})();