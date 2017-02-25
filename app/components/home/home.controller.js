(function () {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$localStorage', 'lessonService', 'authService', '$location', '$mdDialog', '$mdToast', '$mdMenu'];

    function HomeController($localStorage, lessonService, authService, $location, $mdDialog, $mdToast, $mdMenu) {
        // Attach functions to the controller here.
        var vm = this;
        vm.deleteLesson = _deleteLesson;
        vm.newLesson = _newLesson;
        vm.logout = _logOut;
        vm.goToLesson = _goToLesson;
        vm.sortLessons = _sortLessons;
        vm.openMenu = _openMenu;

        // get all user's lessons
        lessonService.getLessons().then(function (lessons, err) {
            // Get all user's lessons from back-end
            vm.lessons = lessons;
            console.log(lessons);
        });

        vm.name = $localStorage.tefl.firstName;

        // Define functions here.
        function _deleteLesson(id) {
            var confirm = $mdDialog.confirm()
                .title('Delete Lesson')
                .textContent('Are you sure you want to delete this lesson?')
                .ariaLabel('Delete Lesson')
                .targetEvent()
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function (lesson) {
                var index = vm.lessons.indexOf(id);
                if (index >= 0) {
                    vm.lessons.splice(index, 1);
                }
                lessonService.deleteLesson(id).then(function () {
                    lessonService.getLessons().then(function (lessons, err) {
                        // Get all user's lessons from back-end
                        vm.lessons = lessons;
                        console.log(lessons);
                    });
                });
            });
        }

        function _goToLesson(id) {
            $location.path('/lesson/' + id);
        }

        function _logOut() {
            authService.logout();
        }

        function _newLesson(lesson) {
            var confirm = $mdDialog.prompt()
                .title('Name Your Lesson')
                .textContent("Give a name to your lesson so you can find it easily later. This can relate to the types of activities it will involve, the specific class you'll use it to teach, etc.")
                .placeholder('Lesson name')
                .ariaLabel('Lesson name')
                .initialValue('')
                .targetEvent()
                .ok('Create')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function (result) {
                // create new lesson with result as name
                console.log('Creating ' + result + '...');
                var newLesson = { title: result }
                lessonService.createLesson(newLesson).then(function (createdLesson, err) {
                    // go to new lesson  
                    $location.path('/lesson/' + createdLesson._id);
                });
            });
        }

        function showDeleteToast() {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Lesson Deleted')
                    .position('top right')
                    .hideDelay(3000)
            );
        }

        function _sortLessons(lessons) {

        }

        var originatorEv;
        function _openMenu($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        }
    }

})();