'use strict';

var app = angular.module('app', [
  'ngRoute',
  'services',
  'app.products',
  'app.cart',
  'app.checkout',
  'firebase'
  ])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])

  .controller('app', function ($scope, LocalStorage, $rootScope, $location) {
    // Initialize cart
    LocalStorage.set('cart', [])

    $scope.orderBy = function(order) {
      $rootScope.$emit('order', order)
    }

    $scope.filterBy = function(filter) {
      $rootScope.$emit('filter', filter)
    }

    $scope.home = function() {
      $location.url('/')
    }
  })

  .filter('year', function() {
    return function(fullYear) {
      var year = Math.ceil((fullYear/100)%1 * 100)
      if(year < 1) return ""
      return year
    }
  })

