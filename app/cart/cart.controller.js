'use strict';

angular.module('app.cart', [])
  .controller('cart', function($scope, $rootScope, Cart){
    $scope.totalBottles = 0
    $scope.cart = Cart.get()

    $rootScope.$on('cartUpdate', function(){
      $scope.cart = Cart.get()
    })
  })
  .directive('cart', function(){
    return {
      restrict: "E",
      templateUrl: "./app/cart/cart.html",
      controller: 'cart'
    }
  })
  .factory('Cart', function(LocalStorage) {
    var cart = LocalStorage.get('cart')

    return {
      get: function() {
        return LocalStorage.get('cart')
      },
      add: function(item) {
        cart.push(item)
        LocalStorage.set('cart', cart)
      },
      remove: function(index) {
        cart.length > 1 ? cart.slice(index, index) : emptyCart()
      },
      empty: function() {
        LocalStorage.set('cart', [])
      } 
    }
  })