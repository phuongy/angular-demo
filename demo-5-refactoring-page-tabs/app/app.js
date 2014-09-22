angular
	.module('app', [])
	.controller('PageCtrl', function() {

		this.selectedTab = 1;

		this.isTabActive = function(tab) {
			return this.selectedTab === tab;
		}

		this.selectTab = function(tab) {
			this.selectedTab = tab;
		}
		
	});