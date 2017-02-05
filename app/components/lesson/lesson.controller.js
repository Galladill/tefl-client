(function () {
	'use strict';

	angular
		.module('lesson')
		.controller('LessonController', LessonController);

	LessonController.$inject = [];

	function LessonController() {
		// Attach functions to the controller here.
		console.log('waaaat');
		var vm = this;

		// Any logic that needs to run when the controller loads should be placed here.
		var content = angular.element('#filterContent');
		var filterButton = angular.element('#filterButton');
		respShowContent();
		$(window).on("resize", function () {
			respShowContent();
		});
		filterButton.on('click', function () {
			content.slideToggle();
		});


		function respShowContent() {
			if (window.innerWidth > 599) {
				content.slideDown();
			} else {
				content.slideUp();
			}

		}
		// Define functions here.
	}
})();