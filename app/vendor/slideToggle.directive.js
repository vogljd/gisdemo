(function () {
  angular
    .module("map.core")
    .directive("slideToggle", slideToggle);
    
  function slideToggle() {    
    var directive = {
		restrict: 'A',      
		scope:{
		  isOpen: "=slideToggle"
		},  
		link: function(scope, element, attr) {

		var slideDuration = parseInt(attr.slideToggleDuration, 500) || 500; 
		  if (attr.startShown=="false") {
	//				$(".panel-main:not(markup-panel)").hide();
					element.hide();
				}
		  scope.$watch('isOpen', function(newVal,oldVal){
		  
		 // vm.navToolbarToggle(0);		  
		  var reopen= false;
			if(element.is(':hidden')!==true) {
					var reopen= true;
			}
			// angular.element($("[slideToggleDuration]")).hide(); // doesn't work
			$(".panel-main").hide();
			if(reopen) {
				element.show();		
			}
			if(newVal !== oldVal){ 
			  element.stop().slideToggle(slideDuration);
			}
		  });
		}
    };
      
    return directive;
  }
  
})();