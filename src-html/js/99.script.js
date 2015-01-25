var app = angular.module('journal-admin-panel', ['ngMaterial', 'ngRoute', 'controllers']);

var controllers = angular.module('controllers', []);

app.config(['$routeProvider', '$mdThemingProvider',
    function ($routeProvider, $mdThemingProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'main.html',
                controller: 'main'
            })
            .otherwise({redirectTo: '/main'});
        $mdThemingProvider
        	.theme('default')
        	.primaryColor('blue');
    }
]);

app.factory('objectStorageService', [function() {
	var serviceInstance = new ObjectStorageService();
	serviceInstance.init();
    return serviceInstance;
}]);

app.directive('autoFocus', function($timeout) {
    return {
        restrict: 'A',
        link: function(_scope, _element) {
            $timeout(function() {
                _element[0].focus();
            }, 10);
        }
    };
});
app.directive('fileInputBind', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileInputBind);
			var modelSetter = model.assign;
			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

app.run(function ($rootScope, $http) {
	
});

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};