(function () {
	'use strict';

	angular
		.module('lesson')
		.controller('LessonController', LessonController);
	LessonController.$inject = ['$mdSidenav', 'lessonService'];

	function LessonController($mdSidenav, lessonService) {
		// Attach functions to the controller here.
		var vm = this;
		vm.addGoal = _addGoal;
		vm.deleteGoal = _deleteGoal;
		vm.openSideNav = _openSideNav;

		// Any logic that needs to run when the controller loads should be placed here.
		lessonService.getLesson('589a2b55ae59620ac700793e').then(function(lesson, err){
			vm.lesson = lesson;
			
			// ng-repeat does not like arrays of strings, so create obects instead!
			angular.forEach(lesson.studentGoals, function(val, idx) {
				vm.studentGoals.push({goal: val});
			});
			if (!vm.studentGoals) {
				vm.studentGoals = [];
				vm.studentGoals.push({goal: ''});
			}
			angular.forEach(lesson.teacherGoals, function(val, idx) {
				vm.teacherGoals.push({goal: val});
			});
			if (!vm.teacherGoals) {
				vm.teacherGoals = [];
				vm.teacherGoals.push({goal: ''});
			}
			

		});

		// Define functions here.
		function _addGoal(goalList) {
			goalList.push({goal: ''});
		}

		function _deleteGoal(goalList, idx) {
			goalList.splice(idx, 1);
		}

		function _openSideNav() {
			$mdSidenav('left').toggle();
		}

	}
})();