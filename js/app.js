var app = angular.module('LostKingdomAPIApp', [])

app.controller('TradegoodsController', [ '$http', function( $http ) {
	var self = this;
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
				console.log( response.data )
			}
		);
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