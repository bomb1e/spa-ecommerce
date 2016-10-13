angular.module('services', [])
  .factory("LocalStorage", function($window){
    return {
      set: function(key, value){
        console.log(key,value)
        if (angular.isArray(value) || angular.isObject(value)) {
          value = JSON.stringify(value);
        }
        $window.localStorage[key] = value;
      },
      get: function(key){
        console.log('getting from lstorage')
        return JSON.parse($window.localStorage[key] || '{}');
      },
      clear: function(){
        return $window.localStorage.clear();
      }
    }
  })