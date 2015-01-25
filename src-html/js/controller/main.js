controllers.controller('main', ['$scope', 'objectStorageService',
    function ($scope, objectStorageService) {

		$scope.addEntry = function() {
			objectStorageService.addEntry($scope.entry);
			$scope.init();
		}

		$scope.toggleDone = function(entry) {
			entry.done = !entry.done;
			objectStorageService.persistEntryList();
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