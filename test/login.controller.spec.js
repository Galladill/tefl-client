describe('Login Controller', function() {

	// Bootstrap our app here
	beforeEach(module('app'));

	// Inject dependencies and mock services here
	var $controller, LoginCtrl, authServiceMock, userServiceMock, $location, $mdToast, $rootScope;
	beforeEach(inject(function($controller, _authServiceMock_, _userServiceMock_, _$location_, _$mdToast_, _$rootScope_){
		authServiceMock = _authServiceMock_;
		$rootScope = _$rootScope_;
		userServiceMock = _userServiceMock_;
		$location = _$location_;
		$mdToast = _$mdToast_;
		LoginCtrl = $controller('LoginController', { authService: authServiceMock, userService: userServiceMock, $location: $location, $mdToast: $mdToast });
  	}));

	// Create an variables we need for our test here
	var testUser = {
		email: 'bobalob@aol.com',
		confirmEmail: 'bobalob@aol.com',
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
		it('should login and redirect on successful login', function(){
			LoginCtrl.user = testUser;
			LoginCtrl.login();
			expect(LoginCtrl.user.firstName).toEqual(undefined);
			expect(LoginCtrl.user.lastName).toEqual(undefined);
			expect(LoginCtrl.user.confirmPassword).toEqual(undefined);
			expect(LoginCtrl.user.confirmEmail).toEqual(undefined);
			$rootScope.$apply();
			expect($location.path()).toBe('/home');
		});
	});

	describe('signup function', function(){
		it('should signup and redirect on successful signup', function(){
			LoginCtrl.user = testUser;
			LoginCtrl.signup();
			expect(LoginCtrl.user.confirmPassword).toEqual(undefined);
			expect(LoginCtrl.user.confirmEmail).toEqual(undefined);
			$rootScope.$apply();
			expect($location.path()).toBe('');
		});
		it('should show an error message on unmatched password', function(){
			LoginCtrl.user = {
				email: 'bobalob@aol.com',
				confirmEmail: 'bobalob@aol.com',
				password: 'prd123',
				confirmPassword: 'password123',
			};
			spyOn($mdToast, 'showSimple');
			LoginCtrl.signup();
			expect($mdToast.showSimple).toHaveBeenCalledWith('Passwords fields must match!');
		});
		it('should show an error message on unmatched email', function(){
			LoginCtrl.user = {
				email: 'bo@aol.com',
				confirmEmail: 'bobalob@aol.com',
				password: 'password123',
				confirmPassword: 'password123',
			};
			spyOn($mdToast, 'showSimple');
			LoginCtrl.signup();
			expect($mdToast.showSimple).toHaveBeenCalledWith('Email fields must match!');
		});

	});
});