angular.module('services', [])
  .factory("LocalStorage", function($window){
    return {
      set: function(key, value){
        if (angular.isArray(value) || angular.isObject(value)) {
          value = JSON.stringify(value);
        }
        $window.localStorage[key] = value;
      },
      get: function(key){
        return JSON.parse($window.localStorage[key] || '{}');
      },
      clear: function(){
        return $window.localStorage.clear();
      }
    }
  })
  .factory("firebaseData", function($firebaseArray) {
    var root = firebase.database().ref()

    return {
      root: root,
      products: $firebaseArray(root.child('products')),
      orders: root.child('orders')
    }
  })