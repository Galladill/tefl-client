describe('Login Controller', function() {

	beforeEach(module('app'));

	var $controller, LoginCtrl, $scope;
	var testUser = {
		email: 'bobalob@aol.com',
		password: 'password123',
		confirmPassword: 'password123',
		firstName: 'Bob',
		lastName: 'Alob'
	};
	console.log('asd');
	beforeEach(inject(function($controller){
		console.log('AESRDTFYTESFDG');
		LoginCtrl = $controller('LoginController', { $scope: $scope });
  	}));

	it('should be created', function () {
		console.log('WAAAAAAT');
		expect(LoginCtrl).not.toEqual(undefined);
	});

	// Any properties that are set when controller instantiates should be spec'd here
	it('should set hello to world ', function() {
		// expect(LoginCtrl.hello).toEqual('world');
	});

	// Describe & spec all of the controller's functions here
	describe('login function', function(){
		beforeEach(function(){
			LoginCtrl.user = testUser;
			LoginCtrl.login();
		});
		it('should remove unnecessary properties', function(){
			expect(LoginCtrl.user.firstName).toEqual(undefined);
			expect(LoginCtrl.user.lastName).toEqual(undefined);
			expect(LoginCtrl.user.confirmPassword).toEqual(undefined);
		});
		it('should redirect on successful login', function(){

		});
	});

	describe('signup function', function(){

	});
});