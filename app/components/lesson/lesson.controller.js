(function () {
	'use strict';

	angular
		.module('lesson')
		.controller('LessonController', LessonController);
	LessonController.$inject = ['$mdSidenav', '$mdDialog', 'lessonService', 'activityService'];

	function LessonController($mdSidenav, $mdDialog, lessonService, activityService) {
		// Attach functions to the controller here.
		var vm = this;
		vm.addGoal = _addGoal;
		vm.deleteGoal = _deleteGoal;
		vm.openSideNav = _openSideNav;
		vm.openDialog = _openDialog;
		vm.removeActivity = _removeActivity;
		vm.addActivity = _addActivity;
		vm.saveLesson = _saveLesson;

		// Any logic that needs to run when the controller loads should be placed here.
		lessonService.getLesson('589a2b55ae59620ac700793e').then(function (lesson, err) {
			vm.lesson = lesson;
			console.log('lesson', lesson);

			// ng-repeat does not like arrays of strings, so create obects instead!
			vm.studentGoals = [];
			vm.teacherGoals = [];
			angular.forEach(lesson.studentGoals, function (val, idx) {
				vm.studentGoals.push({ goal: val });
			});
			if (vm.studentGoals.length == 0) {
				vm.studentGoals.push({ goal: '' });
			}
			angular.forEach(lesson.teacherGoals, function (val, idx) {
				vm.teacherGoals.push({ goal: val });
			});
			if (vm.teacherGoals.length == 0) {
				vm.teacherGoals.push({ goal: '' });
			}
		});

		activityService.getActivities().then(function (activities, err) {
			vm.allActivities = activities;
			console.log('allActivities', vm.allActivities);
		});

		// Define functions here.
		function _addGoal(goalList) {
			goalList.push({ goal: '' });
		}

		function _deleteGoal(goalList, idx) {
			goalList.splice(idx, 1);
		}

		function _openSideNav() {
			$mdSidenav('left').toggle();
		}

		function _openDialog(ev) {
			$mdDialog.show({
				templateUrl: 'app/components/lesson/createActivity.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				// fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			})
				.then(function (answer) {
					// $scope.status = 'You said the information was "' + answer + '".';
				}, function () {
					// $scope.status = 'You cancelled the dialog.';
				});
		}

		function _removeActivity(id) {
			var index = vm.lesson._activity.indexOf(id);
			vm.lesson._activity.splice(index, 1);
		}

		function _addActivity(id) {
			vm.lesson._activity.push(id);
		}

		function _saveLesson() {
			var newStudentGoals = [];
			var newTeacherGoals = [];
			angular.forEach(vm.studentGoals, function (goalObj, idx) {
				newStudentGoals.push(goalObj.goal);
			});
			angular.forEach(vm.teacherGoals, function (goalObj, idx) {
				newTeacherGoals.push(goalObj.goal);
			});
			vm.lesson.studentGoals = newStudentGoals;
			vm.lesson.teacherGoals = newTeacherGoals;

			lessonService.updateLesson(vm.lesson).then(function (lesson, err) {
				console.log('lesson saved', lesson);
			});
		}
	}
})();