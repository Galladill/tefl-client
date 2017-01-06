var chai = require('chai');
var should = chai.should();

describe('User Controller', function() {

	beforeEach(module('app'));

	var $controller, LoginCtrl, $scope, $location;

	beforeEach(inject(function(_$controller_, _$location_){
    	$controller = _$controller_;
    	$location = _$location_;

		LoginCtrl = $controller('LoginCtrl', { $scope: $scope });
  	}));

	it('should be created', function () {
		expect(LoginCtrl).not.toEqual(undefined);
	});

	// Any properties that are set when controller instantiates should be spec'd here
	it('should set hello to world ', function() {
		expect(LoginCtrl.hello).toEqual('world');
	});

	// Describe & spec all of the controller's functions here
	describe('login function', function(){
		it('should change $location', function () {
			LoginCtrl.login();
			expect($location.path()).toBe('/home');
		});
	});
});