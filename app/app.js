(function () {
  var app = angular.module("myMap", [
	/* Vendor components */
	'ui.bootstrap',
	'kendo.directives',
	/* Core components */
//	'ngStorage',
	'ngCookies',
	'ngRoute',
	'ngSanitize',
	'map.core'
	]);
	app.config(function($routeProvider) {
			$routeProvider
			// .when("main", {
				// templateUrl: "main.htm",
				// controller: "mapController"
			// )}
			// .otherwise({redirectTo:"/main"});
	});
	app.filter('spaceless', function() {
		return function(input) {
			if (input) {
				return input.replace(' ', '-');    
			}
		}
	});
	app.filter('trust', ['$sce',function($sce) {
	  return function(value, type) {
		return $sce.trustAs(type || 'html', value);
	  }
	}]);
	app.filter('parseUrl', function($sce) {
		var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
		var emails = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
	 
		return function(text) {
			if(text.match(urls)) {
				text = text.replace(urls, '<a href="$1">$1</a>');
			}
			if(text.match(emails)) {
				text = text.replace(emails, '<a href=\"mailto:$1\">$1</a>');
			}
			return $sce.trustAsHtml(text);
		};
	});	
	
	app.filter('dashless', function() {
		return function(input) {
			if (input) {
				return input.replace('-', ' ');    
			}
		}
	});
	app.filter("splitTxt", function() {
		return function(input, delim, index) {
			input = input.split(delim);
			return input[index];
		};
	});
	app.filter("replaceTxt", function() {
		return function(input, s, r) {
			return input.replace(s, r);
		};
	});
	app.filter('capitalize', function() {
	  return function(input, scope) {
		if (input!=null)
		input = input.toLowerCase();
		return input.substring(0,1).toUpperCase()+input.substring(1);
	  }
	});

	
}())