controllers.controller('main', ['$scope', '$timeout', 'objectStorageService',
    function ($scope, $timeout, objectStorageService) {

		$scope.addEntry = function() {
			objectStorageService.addEntry($scope.entry);
			$scope.init();
		}

		$scope.toggleDone = function(entry) {
			entry.done = !entry.done;
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

	}
]);