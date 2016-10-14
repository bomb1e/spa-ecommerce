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

    $scope.filterBy = function(filter) {
      $rootScope.$emit('filter', filter)
      console.log(filter)
    }
  })

  .filter('year', function() {
    return function(fullYear) {
      var year = Math.ceil((fullYear/100)%1 * 100)
      if(year < 1) return ""
      return year
    }
  })

