// http://codepen.io/brandyshea/pen/BNyvJW?editors=101
		if ($window.localStorage.getItem('userSettings') === null) {
				vm.userSettings = [{
						name: "1",
						checked: false
				}, {
						name: "2",
						checked: false
				}, {
						name: "3",
						checked: false
				}, {
						name: "4",
						checked: false
				}, {
						name: "5",
						checked: false
				}, ];
		} else {
			vm.userSettings = JSON.parse(vm.localStorage['userSettings']);
		};

		vm.updateThemaLocalStorage = function(items) {
			$window.localStorage['userSettings'] = JSON.stringify(items);
		};