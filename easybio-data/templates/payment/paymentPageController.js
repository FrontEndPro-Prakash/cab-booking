(function(){
'use strict';
app.controller('PaymentController', PaymentController);
PaymentController.$inject = ['$scope','PaymentService','localStorageService','$state'];
/* controller for payment page */
function PaymentController($scope,PaymentService,localStorageService,$state) {
	$scope.tab = 1;
	$scope.mobilePaymentMethods=true;

	function init(){
		console.log(localStorageService.get('upgradePlan'));
		$scope.upgradePlan = localStorageService.get('upgradePlan');
		$scope.cardMonthsArray=['12','11','10','09','08','07','06','05','04','03','02','01'];
		$scope.cardYearsArray=[{'id':'25','name':'2025'},{'id':'24','name':'2024'},{'id':'23','name':'2023'},{'id':'22','name':'2022'},{'id':'21','name':'2021'},{'id':'20','name':'2020'},{'id':'19','name':'2019'},{'id':'18','name':'2018'},{'id':'17','name':'2017'},{'id':'16','name':'2016'}];
	}
	init();

	/* changing payment method tab (desktop) */
	$scope.setTab = function(newTab){
	  $scope.tab = newTab;
	};

	/* checking wather current payment method tab opened or not (desktop) */

	$scope.isSet = function(tabNum){
	  return $scope.tab === tabNum;
	};

	$scope.onSubmit=function(){
		$scope.totalAmount = 0.50;
		$scope.processing=true;
		//console.log('submit payment');
	}
	$scope.changeExpiry=function(){
		if(!angular.isDefined($scope.expiryMonth) && !angular.isDefined($scope.expiryYear)) {
			$scope.expiry ="00/00";
		}
		else if(!angular.isDefined($scope.expiryMonth)) {
			$scope.expiry ="00/"+$scope.expiryYear;
		}
		else if(!angular.isDefined($scope.expiryYear)) {
			$scope.expiry = $scope.expiryMonth+"/00";
		}

		$scope.expiry = $scope.expiryMonth+"/"+$scope.expiryYear;
		//console.log($scope.expiry);
	}
	$scope.stripeCallback = function (code, response) {
		$scope.processing = false;
		$scope.hideAlerts();
		if (response.error) {
			$scope.stripeError = response.error.message;
		} else {
			var stripePayment = {}; // my object
			stripePayment.id=localStorageService.get('userId');
			stripePayment.stripeToken = response.id;
			stripePayment.remember = angular.isUndefined($scope.rememberCard)?false:true;
			var upgradePlan = localStorageService.get('upgradePlan');
			//console.log("paymentcontroller upgarde plan: "+upgradePlan);
			stripePayment.subscriptionPlanId = upgradePlan.subscriptionPlanId;
			PaymentService.post(stripePayment).$promise.then(function(response){
				if(response.success){
					localStorageService.set('paymentSuccess',true);
					localStorageService.set('newPlan',upgradePlan);
					localStorageService.set('upgradePlan',null);
					$state.go('manageSubscription');
				} else {
					localStorageService.set('paymentSuccess',false);
					localStorageService.set('newPlan',null);
					$scope.stripeError = 'payment processing error';
				}
			});
			/*$scope.stripeToken = response.id;*/
			//console.log("stripeToken "+stripePayment.stripeToken)
		}
	};
	$scope.hideAlerts = function () {
		$scope.stripeError = null;
		$scope.stripeToken = null;
	};
	/* show hide payment blocks for mobile */
	$scope.showPaymentMethod = function(paymentMethod) {
			if(paymentMethod=='card') {
				$scope.tab=1;
				$scope.mobilePaymentMethods=false;
			} else if(paymentMethod=='netbanking') {
				$scope.tab=2;
				$scope.mobilePaymentMethods=false;
			} else if(paymentMethod=='wallet') {
				$scope.tab=3;
				$scope.mobilePaymentMethods=false;
			} 
	}
	/* hide payment blocks and show again all payment method names */
	$scope.backButton = function() {
			$scope.tab=0;
			$scope.mobilePaymentMethods=true;
	}
}
app.factory('PaymentService', ['$rootScope', '$resource','biodataConfig',
    function ($rootScope, $resource,biodataConfig) {
        return $resource(biodataConfig.apiUrl+'/v1/users/:id/subscription/payment/ ',{id:'@id'}, {
            /*'get': { method: 'GET', params: {}, isArray: false },*/
            'post': { method: 'POST', params: {}, isArray: false },
        });
    }
])
})();