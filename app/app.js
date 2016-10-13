'use strict';

var app = angular.module('app', [
  'ngRoute',
  'services',
  'app.products',
  'app.cart'
  ])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])

  .controller('app', function ($scope, LocalStorage) {
    LocalStorage.set('cart', [])
  })

  .filter('year', function() {
    return function(fullYear) {
      return Math.ceil((fullYear/100)%1 * 100)
    }
  })

