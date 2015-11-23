(function () {
	'use strict';

	angular
	.module("myMap")
	.controller("mapController", mapController);

	function mapController($scope, $http, mapservice, navservice,
		$cookies, $location, // modules $localStorage, $sessionStorage,
		YrFeature, gisApps, drawingShapes, modals, panels, layerDefs // constants
	) {
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
			showAttribution : false,
			sliderPosition : "top-left",
			sliderStyle : "large",
//			layerOpacity: [],
			maplayers : []
			};

		// public methods
		vm.changeDynamicLayer = changeDynamicLayer;
		vm.clearGraphics = clearGraphics;
		vm.navToolbarToggle = navToolbarToggle;
		vm.selectNav = selectNav;
		vm.isActiveNav = isActiveNav;
		vm.layerOpacityChange = layerOpacityChange;
		vm.layerOpacityArray = layerOpacityArray;
		vm.deactivateDraw = deactivateDraw;
		vm.panMap = panMap;
		vm.changeUserSettings = changeUserSettings;
		vm.layerOpacity = [0.90125];
		vm.opacity1 = 50;
		// vm.layerOpacity = $scope.layerOpacity;

		// a few vars from app.config.js
		vm.storage = window.localStorage;
// http://codepen.io/brandyshea/pen/BNyvJW?editors=101
//		vm.storage = JSON.parse(localStorage['userSettings']);
		// vm.storage = function(){ return localStorageService.get('userSettings'); }
		// json stringify
		// setPrefix
		vm.userSettingsList = ['Pan-Arrows', 'Marquee-Zoom', 'Previous-Next-Buttons', 'Overview-Map', 'X-Coordinate', 'Y-Coordinate', 'Zoom-Level'];
		vm.cookies = [];
		vm.YearFeature = YrFeature;
		vm.gisApps = gisApps;
		vm.drawingShapes = drawingShapes;
		vm.layerDefs = layerDefs;
		vm.modals = modals;
		vm.panels = panels;
		vm.toggleYr = {
			item : YrFeature[YrFeature.length - 1].year
		};
		vm.path = $location.path();
		activate();

		function activate() {
			//			mapservice.initCookies(vm.userSettingsList);
			mapservice.createMap("map", vm.map, function (e) {
				// onload
				addMapFeatures();
				$(".preload").fadeOut("slow");
			});
			setUserStorage();
			setUserCookies();
		}

		function addMapFeatures() {
			$scope.$apply(function () {
				//Widgets
				mapservice.initMapLocation("LocateButton");
				mapservice.initMapHome("HomeButton");
				mapservice.initMapSearch("search");
				mapservice.initScalebar("Scalebar");
				mapservice.initOverviewMap("OverviewMap");
				mapservice.initNavTools();
				//				mapservice.initDraw(); // buttons
				mapservice.initDraw2(); // select list of tools
				mapservice.initMeasurement("Measurement");
				mapservice.initBasemapGallery("BasemapGallery");
				mapservice.initPrint("printButton");
				mapservice.initBookmark("bookmark");

				//				vm.userSettings = $cookies.get('userSettings');
				//Layers
				//				mapservice.addFeatureLayer("http://maps.larimer.org/arcgis/rest/services/maps/EFM/MapServer/3", "Flood Plane");
				//				mapservice.addDynamicLayer("http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/7", "Tax Parcels");
				// mapservice.addDynamicLayer("http://maps.larimer.org/arcgis/rest/services/maps/voterMap/MapServer", "Voter");

				mapservice.addDynamicLayer(YrFeature[YrFeature.length - 1].url, "Aerial"); // most recent year
				//				mapservice.addDynamicLayer("http://maps.larimer.org/arcgis/rest/services/mapsCached/imagery2014only/MapServer/0", "Aerial");
				mapservice.addDynamicLayer("http://maps.larimer.org/arcgis/rest/services/mapsCached/ParcelSalesCached/MapServer", "Parcel Sales", 0, 1); // labels
				//				mapservice.addDynamicLayer("http://maps.larimer.org/arcgis/rest/services/maps/parcelOwnerSelectService/MapServer", "Tax Parcels", 0,  1);
				//				mapservice.addDynamicLayer("http://maps.larimer.org/arcgis/rest/services/mapsCached/ParcelDetailCached/MapServer", "Parcel Detail", 0,  1);
				
				mapservice.addFeatureLayer("http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/5", "Tax Parcel");
				//				mapservice.addFeatureLayer("http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/11", "Parcel Popups");

				mapservice.initLegend("Legend");
				var gridColumns = {
					PRECINCT : "PRECINCT",
					SENATEDIST : "Senate Dist",
					HOUSEDIST : "House Dist",
					COMMDIST : "Comm Dist",
					CONGRESSDIST : "Congress Dist"
				};
//				mapservice.selectFeature("http://maps.larimer.org/arcgis/rest/services/maps/voterMap/MapServer/1", gridColumns);
//				mapservice.layerOpacitySlider("esri-opacityinfoslider", "Parcel Sales");

				//				mapservice.hoverDialog();
				// Events
				mapservice.on("pan-end, zoom-end", function (e) {
					panOrZoom();
				});

				mapservice.on("click", function (e) {
					console.log(e);
					click(e);
				});

				refreshMapInfo();
			});
		}

		function refreshMapInfo() {
			mapservice.refreshMapData(vm.map);
			vm.layerOpacity = mapservice.layerOpacityArray();
			console.log("layer opacity: "+vm.layerOpacity);
		}

		var panOrZoom = function () {
			$scope.$apply(function () {
				refreshMapInfo();
			});
		};

		var click = function (evt) {
			$scope.$apply(function () {
				//      mapservice.addGraphicPoint(evt.mapPoint);
//				console.log("click evt.mapPoint: "+evt.mapPoint);
				console.log(evt);
				refreshMapInfo();
			});
		};

		// localStorage.$reset();
		function setUserStorage() {
			var name;
			var val;
			angular.forEach(vm.userSettingsList, function (value, key) {
				name = "userSettings." + value;
				if (!vm.storage.name) {
					switch(value) {
						case "X-Coordinate":
							val=vm.map.center[0];
							break;
						case "Y-Coordinate":
							val=vm.map.center[1];
							break;
						case "Zoom-Level":
							val=vm.map.zoom;
							break;
						default:	
							val='0';
					}
					localStorage.setItem(name, val);
				}
//				console.log(name + ": " + localStorage.getItem(name));
			});
			// for (var k in vm.storage) {
				// console.log(name + ": " + vm.storage.name);
			// }
			console.log(vm.storage);
		}

		function setUserCookies() {
			vm.cookies = [];
			var cookieName = '';
			var val;
			angular.forEach(vm.userSettingsList, function (value, key) {
				cookieName = "userSettings." + value;
				if (!$cookies.get(cookieName)) {
					if (value == "X-Coordinate") {
						val = vm.map.center[0];
					} else if (value == "Y-Coordinate") {
						val = vm.map.center[1];
					} else if (value == "Zoom-Level") {
						val = vm.map.zoom;
					} else {
						val = false;
					}
					$cookies.put(cookieName, val);
				}
				vm.cookies.push({
					name : cookieName,
					val : $cookies.get(cookieName)
				});
//				console.log(cookieName+ ": "+$cookies.get(cookieName));
			});
		}

		function changeUserSettings(type) {
			var val;
			if (type == "text") {
				$cookies.put(this, this.value);
				//				var val;
				console.log("set cookie " + $cookies.get(this) + " to " + this.value);
			} else {
				$cookies.put(this, this.checked);
				console.log("set cookie " + $cookies.get(this) + " to " + this.checked);
			}
		}

		// implementation of public methods
		function changeDynamicLayer(url, id, visibleLayers, opacity) {
			mapservice.changeDynamicLayer(url, id, visibleLayers, opacity);
		};
		function clearGraphics() {
			mapservice.clearGraphics();
		};
		function layerOpacityChange(id, pct) {
			mapservice.layerOpacityChange(id, pct);
		}
		function navToolbarToggle(binary) {
			mapservice.navToolbarToggle(binary);
		}
		function selectNav(item) {
			vm.selectedNav = item;
		};
		function isActiveNav(item) {
			return true;
			//			return vm.selectedNav === item;
		};
		function deactivateDraw() {
			mapservice.deactivateDraw();
		};
		function panMap(direction) {
			mapservice.panMap(direction);
		};
		function layerOpacityArray() {
			mapservice.layerOpacityArray();
		}

	}
})();
