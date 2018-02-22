(function () {
    "use strict";

    describe('Register Controller', function () {


        beforeEach(module('FoodOrderingApp'));

        var _$scope, _$controller, _$state, _$log, _$timeout, _mockUserService, _APP_CONSTANT;

        beforeEach(inject(function ($rootScope, $state, $log, $timeout, UserService, APP_CONSTANT, $controller) {

            _$scope = $rootScope.$new();
            _$state = $state;
            _$log = $log;
            _$timeout = $timeout;
            _mockUserService = UserService;
            _APP_CONSTANT = APP_CONSTANT;


            _$controller = $controller('RegisterController', {
                $scope: _$scope,
                $timeout: _$timeout
            });
        }));

        it('should test whether the variables are defined', function () {

            expect(_$controller.user).toBeDefined();
            expect(_$controller.dataLoading).toBeDefined();

        });

        it('should mock on register service', function () {

            var mockUser = {
                userPassword: 'f1soft',
                confirmPassword: 'f1soft'
            }
            spyOn(_mockUserService, 'setUser').and.callThrough();
            _$controller.registerUser(mockUser);
            expect(_mockUserService.setUser).toHaveBeenCalled();
        });

    });

})();