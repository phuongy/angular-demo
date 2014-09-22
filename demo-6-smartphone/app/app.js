angular.module('myApp', []);

angular.module('myApp').directive('phone', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		link: function(scope, element, attr, ctrl) {

		},
		controller: function() {

		},
		controllerAs: 'phoneCtrl',
		template: '<div class="phone" ng-transclude></div>'
	}
});

angular.module('myApp').directive('speaker', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		link: function(scope, element, attr, ctrl) {

		},
		controller: function() {

		},
		controllerAs: 'speakerCtrl',
		template: '<div class="speaker" ng-transclude></div>'
	}
});

angular.module('myApp').directive('homeButton', function() {
	return {
		restrict: 'E',
		replace: true,
		link: function(scope, element, attr, ctrl) {

		},
		controller: function() {

		},
		controllerAs: 'homeButtonCtrl',
		template: '<div class="home-button"><span class="home-button-symbol"></span></div>'
	}
});

angular.module('myApp').directive('screen', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		link: function(scope, element, attr, ctrl) {

		},
		controller: function() {

		},
		controllerAs: 'screenCtrl',
		template: '<div class="screen" ng-transclude></div>'
	}
});

angular.module('myApp').directive('navbar', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		link: function(scope, element, attr, ctrl) {

		},
		controller: function() {

		},
		controllerAs: 'navbarCtrl',
		template: '<div class="navbar" ng-transclude></div>'
	}
});

angular.module('myApp').directive('container', function() {

	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			id: '@'
		},
		link: function(scope, element, attr, ctrl) {
			
			//ctrl.boundry = Impulse.Boundry({ top: -100, left: -100, bottom: 100, right: 100});

			ctrl.container = Impulse(element)
				.style('translate', function(x, y) {
    				return x + 'px, ' + y + 'px'
  				});

			var drag = ctrl.container.drag({
				//boundry: ctrl.boundry
			});

			drag.on('end', function(event) {
				ctrl.container.spring({tension: 600, damping: 26}).to(0,0).start();
			});

			console.log(ctrl.container);

		},
		controller: function() {
			var container, boundry;
		},
		controllerAs: 'containerCtrl',
		template: '<div class="container" ng-transclude></div>'
	}

});