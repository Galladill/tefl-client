(function () {
	'use strict';

	angular
		.module('login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['authService', 'userService', '$location', '$mdToast'];

	function LoginController(authService, userService, $location, $mdToast) {
		// Attach functions to the controller here.
		var vm = this;
		vm.login = _login;
		vm.signup = _signup;
		vm.scroll = _scroll;

		// Any logic that needs to run when the controller loads should be placed here.

		// Define functions here.
		function _login() {
			delete vm.user.confirmPassword;
			delete vm.user.confirmEmail;
			delete vm.user.firstName;
			delete vm.user.lastName;

			authService.login(vm.user.email, vm.user.password).then(function (res) {
				$location.path('/home');
			});
		}

		function _signup() {
			if (vm.user.confirmPassword !== vm.user.password) {
				$mdToast.showSimple('Passwords fields must match!');
			} else if (vm.user.confirmEmail !== vm.user.email) {
				$mdToast.showSimple('Email fields must match!');
			} else {
				delete vm.user.confirmPassword;
				delete vm.user.confirmEmail;
				userService.createUser(vm.user).then(function (res) {
					$location.path('');
				});
			}
		}

		function _scroll() {
			var scrollTarget = angular.element('#login-div');
			$('body').animate({scrollTop: scrollTarget.offset().top}, 'swing');
		}
	}
})();