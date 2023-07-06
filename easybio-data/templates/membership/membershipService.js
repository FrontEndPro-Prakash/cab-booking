'use strict';
/* membership service to call membership apis */
app.factory('SubscriptionPlansServices', ['$rootScope', '$resource','biodataConfig','localStorageService',
    function ($rootScope, $resource,biodataConfig,localStorageService) {
        return $resource(biodataConfig.apiUrl+'/v1/subscriptionPlans/ ', { }, {
            'get': { method: 'GET', params: {}, isArray: false,cache : true },
        });
    }
]);