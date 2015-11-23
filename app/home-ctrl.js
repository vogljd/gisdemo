(function () {
	'use strict';

	angular
	.module("myMap")
	.controller("homeController", homeController);

	function homeController($scope, $location, $cookies, mapservice, gisApps) {
		/* jshint validthis: true */
		var vm = this;

		vm.map = {
			basemap : "streets",
			// basemap: "Satellite",			
			center : [-105.539, 40.609],
			zoom : 10,
			lng : 0,
			lat : 0,
			logo : false,
			isKeyboardNavigation : true,
			//         isPanArrows: true,
			showAttribution : false
			// sliderPosition : "top-left",
			// sliderStyle : "large",
			// maplayers : []
		};
		
		// public methods
		vm.panMap = panMap;
		
		// a few vars from app.config.js
		vm.gisApps = gisApps;
		vm.path = $location.path();
		activate();
		
		function activate() {
			mapservice.createMap("map", vm.map, function (e) {
			// onload
				addMapFeatures();
				$('.panel-spans').fadeIn(2000);
			});
		}

		function addMapFeatures() {
			$scope.$apply(function () {
				//Widgets
				
				// Events
				mapservice.on("pan-end, zoom-end", function (e) {
					panOrZoom();
				});

				mapservice.on("click", function (e) {
					click(e);
				});

				refreshMapInfo();
			});
		}

		function refreshMapInfo() {
//			mapservice.refreshMapData(vm.map);
		}

		var panOrZoom = function () {
			$scope.$apply(function () {
				refreshMapInfo();
			});
		};

		var click = function (evt) {
			$scope.$apply(function () {
				//      mapservice.addGraphicPoint(evt.mapPoint);
				refreshMapInfo();
			});
		};
		
		// implementation of public methods
		function panMap(direction) {
			mapservice.panMap(direction);
		};			
	}
})();