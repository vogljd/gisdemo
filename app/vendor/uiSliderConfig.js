(function () {

	angular
	.module("map.core")
	.factory("uiSliderConfig", uiSliderConfig);

	function uiSliderConfig() {app.factory('uiSliderConfig', function ($log) {
			return {
		    	start: function (event, ui) { $log.info('Event: Slider start - set with uiSliderConfig', event); },
		    	stop: function (event, ui) { $log.info('Event: Slider stop - set with uiSliderCOnfig', event); },
			};
		});

	}

}
());
