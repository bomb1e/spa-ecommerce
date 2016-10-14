'use strict';

var app = angular.module('app', [
  'ngRoute',
  'services',
  'app.products',
  'app.cart',
  'firebase'
  ])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    
    

  }])

  .controller('app', function ($scope, LocalStorage, $rootScope) {
    LocalStorage.set('cart', [])

    $scope.orderBy = function(order) {
      $rootScope.$emit('order', order)
      console.log(order)
    }
  })

  .filter('year', function() {
    return function(fullYear) {
      return Math.ceil((fullYear/100)%1 * 100)
    }
  })

