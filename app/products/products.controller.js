'use strict';

angular.module('app.products', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './app/products/products.html',
        controller: 'products',
        resolve: { products: resolveProducts }
      })

    function resolveProducts(firebaseData) {
      return firebaseData.products
    }

  }])

  .controller('products', function ($scope, $rootScope, Cart, $filter, firebaseData) {
    $scope.order = ""
    $scope.filter = ""

    $rootScope.$on('order', function(event, order) {
      $scope.order = order
    })

    $rootScope.$on('filter', function(event, filter) {
      $scope.filter = filter
    })

    var products = firebaseData.products

    $scope.products = products

    $scope.details = function(description) {
      console.log("Product desc: " + description);
    }

    $scope.addToCart = function(product, bottleQuantity, caseQuantity) {
      if(bottleQuantity || caseQuantity) {
          Cart.add({
          product: product,
          bottleQuantity: bottleQuantity,
          caseQuantity: caseQuantity
        })
        Cart.emitCartEvent()
        this.bottleQuantity = undefined
        this.caseQuantity = undefined
      } else {
          alert('Quantity please :)')
        }
      }
    
  })

  .directive('product', function() {
    return {
      restrict: "E",
      templateUrl: "./app/products/_product.html",
      controller: 'products',
      scope: {
        product: "=product"
      }
    }
  })
