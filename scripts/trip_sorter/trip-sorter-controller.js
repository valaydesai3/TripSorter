var TripSorter = angular.module("TripSorter",['HttpService']);

angular.module("TripSorter").controller("CntTripSorter", ['$scope','$rootScope', '$filter', '$timeout', 'HttpServiceFactory',
'$location',function($scope, $rootScope, $filter, $timeout,HttpServiceFactory, $location){
	console.log(':::TripSorter Controller:::');

	$scope.oDeals = [];	
	var sURL = "data/response.json";
	
	HttpServiceFactory.getData(sURL,null,false,true,null).then(function(response){	
		console.log(response);

		$scope.oDeals = response.deals;
		
		$scope.aDepartures = {};
		$scope.selectedDeparture;
		$scope.aArrivals = {};
		$scope.selectedArrival;
		$scope.aCheapDeals = null;

		var i=0;
		$.each($scope.oDeals, function(index, value) {
			if ($scope.aDepartures[value.departure] === undefined) {
				$scope.aDepartures[value.departure] = ({"id":i++, "name":value.departure});				
			}
		});
		
		//$scope.selectedDeparture = $scope.aDepartures[Object.keys($scope.aDepartures)[0]];
		//$scope.fnGetArrivals();
		
		/*$.each($scope.oDeals, function(index, value) {
			if ($scope.aArrivals[value.arrival] === undefined) {
				$scope.aArrivals[value.arrival] = ({"id":i++, "name":value.arrival});				
			}
		});*/
		
	});
	
	$scope.fnGetArrivals = function(){
		$scope.aArrivals = {};
		$scope.aCheapDeals = {};
		if($scope.selectedDeparture !== null){	
			console.log(':::fnGetArrivals:::');
			var i=0;
			
			$.each($scope.oDeals, function(index, value) {			
				if($scope.selectedDeparture.name == value.departure && $scope.aArrivals[value.arrival] === undefined){
					$scope.aArrivals[value.arrival] = ({"id":i++, "name":value.arrival});
				}
			});
		}
	}
	
	$scope.fnGetCheapDeals = function(){
		$scope.aFastDeals = {};
		$scope.aCheapDeals = $scope.oDeals.filter(function(deal){
			return deal.arrival == $scope.selectedArrival.name && deal.departure == $scope.selectedDeparture.name;
		}).sort(function(a, b){
			return (a.cost-(a.cost*a.discount/100)) - (b.cost - (b.cost*b.discount/100));
		});
	}
	
	
	$scope.fnGetFastDeals = function(){
		$scope.aCheapDeals = {};
		$scope.aFastDeals = $scope.oDeals.filter(function(deal){
			return deal.arrival == $scope.selectedArrival.name && deal.departure == $scope.selectedDeparture.name;
		}).sort(function(a, b){
			return ((a.duration.h*60)+a.duration.m) - ((b.duration.h*60)+b.duration.m);
		});
	}

}]);