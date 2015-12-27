controllers.controller('main', ['$scope', '$timeout', '$mdDialog', 'objectStorageService',
    function ($scope, $timeout, $mdDialog, objectStorageService) {

		$scope.addEntry = function() {
			objectStorageService.addEntry($scope.entry);
			$scope.init();
		}

		$scope.toggleDone = function(entry) {
			entry.done = !entry.done;
			$scope.entry = ""
			$timeout(function() { objectStorageService.persistEntryList();}, 200);
		}

		$scope.remove = function(entry) {
			objectStorageService.removeEntry(entry);
		}

		$scope.init = function() {
			$scope.entry = new Entry({
				name: "",
				uuid: generateUUID(),
				done: false
			});
		}

		$scope.init();
		$scope.entryList = objectStorageService.entryList;

		$scope.showHelp = function(ev) {
			$mdDialog.show({
				controller: 'helpController',
		        templateUrl: 'help.html',
		        targetEvent: ev
			});
		}

	}
]);