controllers.controller('helpController', ['$scope', '$mdDialog',
    function ($scope, $mdDialog) {

		$scope.close = function() {
			$mdDialog.hide();
		}

	}
]);