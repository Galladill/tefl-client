(function () {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$localStorage', 'lessonService', 'authService', '$location', '$mdDialog', '$mdToast'];

    function HomeController($localStorage, lessonService, authService, $location, $mdDialog, $mdToast) {
        // Attach functions to the controller here.
        var vm = this;
        vm.deleteLesson = _deleteLesson;
        vm.newLesson = _newLesson;
        vm.logout = _logOut;
        vm.goToLesson = _goToLesson;

        // Any logic that needs to run when the controller loads should be placed here.

        // array for sorting lessons

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

            $mdDialog.show(confirm).then(function () {
                lessonService.deleteLesson(id);
                // If lesson was successfully deleted, show delete toast
                showDeleteToast();
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
                console.log('Working to create ' + result + '...');
                lessonService.createLesson(result).then(function (newLesson, err) {
                    vm.allLessons.push(newLesson);
                    vm.addLesson(newLesson);
                    vm.saveLesson();
                    $mdDialog.hide();
                    // go to new lesson  
                    // $location.path('/lesson/' + id);
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
    }

})();