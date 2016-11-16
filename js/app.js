var app = angular.module('LostKingdomAPIApp', ["ngRoute"])

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "/templates/home.html",
    controller: "homeController"
  })
  .when("/tradegoods", {
    templateUrl : "/templates/tradegoods.html",
    controller: "TradegoodsController"
  })
  .when("/about", {
    templateUrl : "about.html"
  })
});

app.config(['$httpProvider', function ($httpProvider) {
    // enable http caching
   $httpProvider.defaults.cache = true;
}])

app.controller('homeController', ['$http', function( $http)  {
	var self = this;
}]);

app.controller('TradegoodsController', [ '$http', function( $http ) {
	var self = this;
	if ( !self.goods ) {
		$http.get('http://api-dev.lostkingdom.net/api/v1/tradegoods')
			.then(
				function(response) {
					self.goods = response.data;
					self.goodsCount = self.goods.length
				}
			);
		$http.get('http://api-dev.lostkingdom.net/api/v1/tradegoodcategories')
			.then(
				function(response) {
					self.categories = response.data;
				}
			);
	}
}]);

app.filter('searchFor', function(){
	return function(arr, searchString){
		if(!searchString){
		    return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		angular.forEach(arr, function(item){
			if(item.name.toLowerCase().indexOf(searchString) !== -1){
			result.push(item);
		}
		});
		return result;
	};
});

app.directive('bsActiveLink', ['$location', function ($location) {
return {
    restrict: 'A', //use as attribute 
    replace: false,
    link: function (scope, elem) {
        //after the route has changed
        scope.$on("$routeChangeSuccess", function () {
            var hrefs = ['/#' + $location.path(),
                         '#' + $location.path(), //html5: false
                         $location.path()]; //html5: true
            angular.forEach(elem.find('a'), function (a) {
                a = angular.element(a);
                if (-1 !== hrefs.indexOf(a.attr('href'))) {
                    a.parent().addClass('active');
                } else {
                    a.parent().removeClass('active');   
                };
            });     
        });
    }
}
}]);