(function () {
// so far unable to inject map from mapservices so it's not working
// http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
// to test, changed panMap function on map-ctrl.js to use navservice 
	angular
	.module("map.core")
	.factory("navservice", navservice);
//	 	.$inject = ['mapservices'];

	function navservice() { //mapservices
		// scope vars		
		var map;

		var service = {
			panMap : panMap,
			on : on
		};

		return service;

		activate();

		function activate() {
			$scope.$on("$destroy", destroy);
		}

		function on(event, callBack) {
			map.on(event, callBack);
		}

		function panMap(direction) {
			require(["dojo/domReady!"
				],
				function () {
				if (direction == 'up') {
					map.panUp();
				} else if (direction == 'down') {
					map.panDown();
				} else if (direction == 'left') {
					map.panLeft();
				} else if (direction == 'right') {
					map.panRight();
				}
			});
		};

		function destroy() {
			map.destroy();
		}

	}

}
());
