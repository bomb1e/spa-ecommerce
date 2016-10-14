'use strict';

angular.module('app.checkout', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: './app/checkout/checkout.html',
        controller: 'checkout',
        resolve: { products: resolveCart }
      })

    function resolveCart(Cart) {
      return Cart.get()
    }

  }])

  .controller('checkout', function($scope, Cart, firebaseData, $location) {
    
    $scope.cart = Cart.get()
    
    $scope.totalPrice = Cart.totalPrice

    $scope.itemTotal = function(item) {
      return ((item.bottleQuantity * item.product.bottlePrice) || 0) + ((item.caseQuantity * item.product.casePrice) || 0)    
    }

    $scope.order = function() {
      
      // Build order object
      var order = {
        cart: sanitize($scope.cart),
        totalPrice: $scope.totalPrice
      }

      function sanitize(cart) {
        
        return cart.map(function(item) {
          return delete item.product['$id']
        })

      }

      swal({
        title: "Confirm order",
        text: "We'll reach out to you",
        type: "input",
        inputPlaceholder: "Your phone number",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
      },
      function(inputValue){
        if (inputValue === false) return false;
  
        if (inputValue === "") {
          swal.showInputError("You need to write something!");
          return false
        }
        
        setTimeout(function(){
          order.phoneNumber = inputValue

          // Send order to endpoint
          firebaseData.orders.push(order)

          // Give the user some feedback and redirect to the store page
          swal("Order worth $" + order.totalPrice + " made for phone number" + inputValue + "!");
        }, 2000);
        Cart.empty()
        Cart.emitCartEvent()
        $location.url('/')
      });
    }

  })