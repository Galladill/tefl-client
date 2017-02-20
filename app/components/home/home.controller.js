(function () {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$localStorage', 'lessonService', 'authService', '$location'];

    function HomeController($localStorage, lessonService, authService, $location) {
        // Attach functions to the controller here.
        var vm = this;
        vm.editLesson = _editLesson;
        vm.deleteLesson = _deleteLesson;
        vm.createLesson = _createLesson;
        vm.logout = HomeController.logout;
        vm.goToLesson = _goToLesson;

        // Any logic that needs to run when the controller loads should be placed here.
        vm.sorts = [
            "Title",
            "Duration",
            "Level"
        ];
        lessonService.getLessons().then(function(lessons, err){
            vm.lessons = lessons;
            console.log(lessons);
        });


        vm.name = $localStorage.tefl.firstName;

        // Remove later
        console.log($localStorage.tefl);

        // Get all user's lessons from back-end
        vm.userLessons = {};

       

        
        // Define functions here.
        function _editLesson() {

        }
        function _deleteLesson() {

        }
        function _createLesson() {

        }
        function _goToLesson(id) {
            $location.path('/lesson/' + id);
        }
        

    }
})();