angular
	.module('app', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider) {

            $routeProvider
                .when('/content/1', {
                    templateUrl: 'views/content-1.html'
                })             
                .when('/content/2', {
                    templateUrl: 'views/content-2.html'
                })             
                .when('/content/3', {
                    templateUrl: 'views/content-3.html'
                })             
                .when('/content/4', {
                    templateUrl: 'views/content-4.html'
                })             
                .otherwise({
                    redirectTo: '/content/1'
                });

    })
	.controller('PageCtrl', function($rootScope, $location) {
		
		var self = this;

		this.isTabActive = function(tab) {
			return this.selectedTab == tab;
		}

		this.updateSelectedTab = function() {
			this.param = $location.path().split("/").pop();
			this.selectedTab = this.param ? this.param : 1;
		}

		$rootScope.$on("$routeChangeStart", function () {
			self.updateSelectedTab();
		});
		
	});