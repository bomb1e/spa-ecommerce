'use strict';

angular.module('app.products', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './app/products/products.html',
        controller: 'products'
      })
  }])

  .controller('products', function ($scope, $rootScope, Cart) {
    $scope.quantity

    $scope.products = [
      {
        year: "2013",
        title: "Breidecker",
        rating: 2,
        bottlePrice: 17.90,
        casePrice: 204.06,
        description: "",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/spa-ecommerce.appspot.com/o/wine-bottles%2FBreidecker_small.jpg?alt=media&token=a9a3a38f-b189-4b6c-a609-6b05c03d3398",
        tags: ["white"]
      },
      {
        year: "2015",
        title: "Chardonnay",
        rating: 12,
        bottlePrice: 18.90,
        casePrice: 215.46,
        description: "",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/spa-ecommerce.appspot.com/o/wine-bottles%2Fchardonnay_v_1.png?alt=media&token=b0341993-4e23-4526-967f-5fb604fef535",
        tags: ["white"]
      }
    ]

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
        console.log("Cart item: ", product, "bottleQuantity: " + bottleQuantity)
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
