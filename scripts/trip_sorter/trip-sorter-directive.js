angular.module("TripSorter").directive('fromToSelect',['$rootScope', 'HttpServiceFactory',function($rootScope, HttpServiceFactory){
	return {
		restrict: 'E',
		controller: 'CntTripSorter',
		templateUrl: 'templates/trip_sorter/from-to-select.html',
		link: function(scope, element, attrs){
			console.log(':::fromToSelect directive');
		}
	}
}]);