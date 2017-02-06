(function () {
	'use strict';

	angular
		.module('lesson')
		.controller('LessonController', LessonController);
	console.log('poop');
	LessonController.$inject = [];

	function LessonController() {
		// Attach functions to the controller here.
		var vm = this;
		vm.addGoal = _addGoal;
		vm.deleteGoal = _deleteGoal;
		vm.lesson = {};
		vm.studentGoals = [{goal: 'testeroni'}];
		vm.teacherGoals = ['test', 'ay'];
		vm.lesson.duration = 40;
		// Any logic that needs to run when the controller loads should be placed here.
		var activityPane = angular.element('#activityPane');
		var activityButton = angular.element('#activityButton');
		respShowContent();
		$(window).on("resize", function () {
			respShowContent();
		});
		activityButton.on('click', function () {
			activityPane.slideToggle();
		});

		// Define functions here.
		function _addGoal(goalList) {
			goalList.push({goal: ''});
		}

		function _deleteGoal(goalList, idx) {
			goalList.splice(idx, 1);
		}

		function respShowContent() {
			if (window.innerWidth > 959) {
				activityPane.slideDown();
			} else {
				activityPane.slideUp();
			}
		}
	}
})();