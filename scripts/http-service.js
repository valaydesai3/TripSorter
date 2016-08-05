var HttpService = angular.module("HttpService",[]);

HttpService.factory("HttpServiceFactory",['$http', '$q', '$location', '$rootScope' ,function($http, $q, $location, $rootScope){
  return {
	getData: function(url, headers, bOnErrorRedirect, bShowInPageError, params){
	  var headerParam = {'Accept':'application/json'};
	  if(headers !== undefined || headers !== null){
		headerParam = $.extend(headerParam, headers);
	  }
	  
	  var updatedParams = {'TimeStamp':new Date().getTime()};
	  updatedParams = $.extend(params, updatedParams);
	  
	  var deferred = $q.defer();
	  $http.get(url,{
		headers: headerParam,
		  params : updatedParams
	  }).success(function(successResponse){
		  if(successResponse){			
			var responseJSON = angular.fromJson(successResponse);
			if(responseJSON && responseJSON.messages && responseJSON.messages.length){
			  //Process Error
			}else{
			  deferred.resolve(successResponse);
			}
		  }else{
			deferred.resolve(successResponse);
		  } 
	  }).error(function(errorResponse , status){
		//Process Error
		  console.error("status here:: "+status);
		  if(status == 0){
			deferred.reject( { ErrorResponse : 'Server is Temporarily down, please try after some time' , Status : status });
		  }else if(status == 404){
			deferred.reject( { ErrorResponse : errorResponse , Status : status });
		  }else if(status == 408){
			deferred.reject( { ErrorResponse : 'Your request has timeout , please try again. If the problem persist , please log a GIM ticket.' , Status : status });
		  }else{			
			deferred.reject( { ErrorResponse : 'Server is Temporarily down, please try after some time' , Status : status });
		  }		  
	  });
	  return deferred.promise;
	}
  }      
}]);