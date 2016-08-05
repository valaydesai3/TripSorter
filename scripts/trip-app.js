var TripApp = angular.module("TripApp",['HttpService','TripSorter']);

/*
Initialise rootscope params and define global functions in run block
*/
TripApp.run(['$rootScope', '$location', '$window', '$timeout', function($rootScope, $location, $window, $timeout){	
	$rootScope.nDeploymentVersion = 1;
	console.log($rootScope.nDeploymentVersion);
	
}]);