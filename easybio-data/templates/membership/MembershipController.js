(function(){
'use strict';

app.controller('MembershipController', MembershipController);
MembershipController.$inject = ['$scope','subscriptionPlans','userSubscriptionPlans'];
function MembershipController($scope,subscriptionPlans,userSubscriptionPlans) {
	function init(){
		$scope.subscriptionPlans = subscriptionPlans.data;
		$scope.userSubscriptionPlans = userSubscriptionPlans.data;

		console.log($scope.userSubscriptionPlans);
	} 
	init();
}
})();