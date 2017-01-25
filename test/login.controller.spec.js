describe('Login Controller', function() {

	// Bootstrap our app here
	beforeEach(module('app'));

	// Inject dependencies and mock services here
	var $controller, LoginCtrl, authServiceMock, userServiceMock;
	beforeEach(inject(function($controller, _authServiceMock_, _userServiceMock_){
		authServiceMock = _authServiceMock_;
		userServiceMock = _userServiceMock_;
		LoginCtrl = $controller('LoginController', { authService: authServiceMock, userService: userServiceMock });
  	}));

	// Create an variables we need for our test here
	var testUser = {
		email: 'bobalob@aol.com',
		password: 'password123',
		confirmPassword: 'password123',
		firstName: 'Bob',
		lastName: 'Alob'
	};
	
	// Ensure that what we're testing is being created here
	it('should be created', function () {
		expect(LoginCtrl).not.toEqual(undefined);
	});

	// Any properties that are set when controller instantiates should be spec'd here
	// it('should set hello to world ', function() {
	// 	expect(LoginCtrl.hello).toEqual('world');
	// });

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