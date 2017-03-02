(function () {
    'use strict';

    angular
        .module('lesson')
        .controller('LessonController', LessonController);
    LessonController.$inject = ['$mdSidenav', '$mdDialog', 'lessonService', 'activityService', '$q', '$mdToast', '$routeParams', '$location'];

    function LessonController($mdSidenav, $mdDialog, lessonService, activityService, $q, $mdToast, $routeParams, $location) {
        // Attach functions to the controller here.
        var vm = this;
        vm.addGoal = _addGoal;
        vm.deleteGoal = _deleteGoal;
        vm.openSideNav = _openSideNav;
        vm.editActivity = _editActivity;
        vm.removeActivity = _removeActivity;
        vm.addActivity = _addActivity;
        vm.saveLesson = _saveLesson;
        vm.saveActivity = _saveActivity;
        vm.closeDialog = _closeDialog;
        vm.findActivity = _findActivity;
        vm.goToHome = _goToHome;
        vm.moveActivity = _moveActivity;

        // Any logic that needs to run when the controller loads should be placed here.
        $q.all({
            lesson: lessonService.getLesson($routeParams.id),
            activities: activityService.getActivities(),
        }).then(function (response, err) {
            vm.allActivities = response.activities;
            vm.lesson = response.lesson;
            vm.lesson.duration = getTotalDuration();
            // ng-repeat does not like arrays of strings, so create obects instead!
            vm.studentGoals = [];
            vm.teacherGoals = [];
            angular.forEach(vm.lesson.studentGoals, function (val, idx) {
                vm.studentGoals.push({ goal: val });
            });
            if (vm.studentGoals.length == 0) {
                vm.studentGoals.push({ goal: '' });
            }
            angular.forEach(vm.lesson.teacherGoals, function (val, idx) {
                vm.teacherGoals.push({ goal: val });
            });
            if (vm.teacherGoals.length == 0) {
                vm.teacherGoals.push({ goal: '' });
            }
        });
        
        // Define functions here

        function _addGoal(goalList) {
            goalList.push({ goal: '' });
        }
        function _deleteGoal(goalList, idx) {
            goalList.splice(idx, 1);
        }

        // Open the sidenav activity list
        function _openSideNav() {
            $mdSidenav('left').toggle();
        }

        // Move/reorder and activity in the lesson
        function _moveActivity(y, x) {
            var temp = vm.lesson._activity[y];
            vm.lesson._activity[y] = vm.lesson._activity[x];
            vm.lesson._activity[x] = temp;
        }

        // Open the dialog to edit/create an activity
        function _editActivity(ev, activity) {
            if (activity) {
                vm.currentActivity = activity;
            } else {
                vm.currentActivity = {};
            }
            $mdDialog.show({
                templateUrl: 'app/components/lesson/activityEdit.html',
                parent: angular.element(document.body),
                controller: function () { return vm; },
                controllerAs: 'Lesson',
                targetEvent: ev,
                clickOutsideToClose: true,
            });
        }

        function _goToHome() {
            $location.path('/home');
        }

        function _saveActivity(activity) {
            if (activity._id) {
                // Update an existing activity
                activityService.updateActivity(activity).then(function (res, err) {
                    vm.saveLesson();
                });
            } else {
                // Create a new activity
                activityService.createActivity(activity).then(function (newActivity, err) {
                    vm.allActivities.splice(0, 0, newActivity);
                    vm.addActivity(newActivity);
                    vm.saveLesson();
                    $mdDialog.hide();
                });
            }
        }

        function _findActivity(activityId) {
            return $.grep(vm.allActivities, function(e){
                return e._id === activityId;
            })[0];
        }

        function showSuccessToast() {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Save Successful!')
                    .position('top right')
                    .hideDelay(3000)
            );
        }

        // Remove an activity from a lesson
        function _removeActivity(activity) {
            var index = vm.lesson._activity.indexOf(activity._id);
            vm.lesson._activity.splice(index, 1);
            vm.lesson.duration -= activity.duration;
        }

        function _closeDialog() {
            $mdDialog.hide();
        }

        // Add an activity to a lesson
        function _addActivity(activity) {
            vm.lesson._activity.push(activity._id);
            vm.lesson.duration += activity.duration;
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
                showSuccessToast();
            });
        }

        // Get the total duration of all activities in a lesson
        function getTotalDuration() {
            var total = 0;
            var index;
            angular.forEach(vm.allActivities, function (activity, idx) {
                index = vm.lesson._activity.indexOf(activity._id);
                if (index >= 0) {
                    total += vm.allActivities[idx].duration;
                }
            });
            return total;
        }
    }
})();