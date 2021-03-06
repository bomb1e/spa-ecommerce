'use strict';

angular.module('app.cart', [])
  .controller('cart', function($scope, $rootScope, Cart, $location){
    $scope.totalBottles = 0
    $scope.cart = Cart.get()
    $scope.totalPrice = Cart.totalPrice

    // Listen for updates to the cart and compute totals
    $rootScope.$on('cartUpdate', function(){
      $scope.cart = Cart.get()
      
      if($scope.cart.length > 0) {
        $scope.totalBottles = $scope.cart.map(function(item) {
          return (item.bottleQuantity || 0) + (item.caseQuantity || 0)
        }).reduce(function(a, b) {
          return a + b
        })

        $scope.totalPrice = $scope.cart.map(function(item) {
          return itemTotal(item)
        }).reduce(function(a,b) {
          return a + b
        })
      } else {
        $scope.totalPrice = 0
        $scope.totalBottles = 0
      }
      Cart.totalPrice = $scope.totalPrice
    })

    $scope.emptyCart = function() {
      Cart.empty()
      Cart.emitCartEvent()
    }

    $scope.remove = function(index) {
      Cart.remove(index)
      Cart.emitCartEvent()
    }

    $scope.checkout = function() {
      $scope.cart.length > 0 ? $location.url('/checkout') : swal('Add a bottle or case to the cart')
    }

    function itemTotal(item) {
      return ((item.bottleQuantity * item.product.bottlePrice) || 0) + ((item.caseQuantity * item.product.casePrice) || 0)    
    }
    

  })

  // <cart></cart>
  .directive('cart', function(){
    return {
      restrict: "E",
      templateUrl: "./app/cart/cart.html",
      controller: 'cart'
    }
  })

  // Service to deal with Cart logic
  .factory('Cart', function(LocalStorage, $rootScope) {
    var cart = LocalStorage.get('cart')
    var totalPrice = 0
    return {
      
      get: function() {
        return LocalStorage.get('cart')
      },

      add: function(item) {
        cart.push(item)
        LocalStorage.set('cart', cart)
      },

      remove: function(index) {
        index !== 0 ? cart.splice(index, 1) : cart.pop()
        LocalStorage.set('cart', cart)
      },

      empty: function() {
        LocalStorage.set('cart', [])
        cart = []
      },

      emitCartEvent: function() {
        $rootScope.$emit('cartUpdate')
      }
    }
  })