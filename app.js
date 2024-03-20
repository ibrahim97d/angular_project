var app = angular.module('userApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/users', {
            templateUrl: 'user-list.html',
            controller: 'UserListCtrl'
        })
        .when('/users/:id', {
            templateUrl: 'user-detail.html',
            controller: 'UserDetailCtrl'
        })
        .otherwise({
            redirectTo: '/users'
        });
}]);

app.controller('UserListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.users = [];

    $http.get('https://reqres.in/api/users').then(function(response) {
        $scope.users = response.data.data;
    });

    $scope.goToDetail = function(id) {
        $location.path('/users/' + id);
    };
}]);

app.controller('UserDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var userId = $routeParams.id;

    $http.get('https://reqres.in/api/users/' + userId).then(function(response) {
        $scope.user = response.data.data;
    });
}]);