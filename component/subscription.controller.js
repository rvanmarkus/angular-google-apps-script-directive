'use strict';

class SubscriptionCtrl {
    constructor ($scope, $http) {
        $scope.subscriber = {};

        $scope.submitSubscription = function(subscriber){
            if(! $scope.subscribeForm.$valid){
                return;
            }
            $scope.subscriptionSuccess = false;
            $scope.loading = true;


            //TODO set url to google apps script for test guys!
            var postUrl = 'https://script.google.com/macros/s/AKfycbw2AwKwSZR5DlN5-GdWEOzWbJvqRxdYWIZoH4Givdh-B7jsWF0/exec';

            var postData = {
                'email' : subscriber.email
            };
            var headers = {
                //'Content-Type' : 'text/plain'
                'Content-Type' : 'application/json'
            };
            $http.get(postUrl, {'method':'GET','headers':headers,'params': postData}).success(function(response){
                if(response.result === 'success'){
                    $scope.subscriptionSuccess = true;
                    $scope.loading = false;
                    $scope.subscribeForm.$setPristine();
                    $scope.subscriber = {};
                }

            }).error(function(){

                //TODO tijdelijke oplossing voor safari fixen! request naar google geeft geen normale response waardoor error promise wordt afgeschoten in safari browsers...
                $scope.subscriptionSuccess = true;
                $scope.loading = false;
                $scope.subscribeForm.$setPristine();
                $scope.subscriber = {};
            });
        };
    }
}

SubscriptionCtrl.$inject = ['$scope', '$http'];

export default SubscriptionCtrl;
