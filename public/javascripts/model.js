(function () {
  'use strict';

  angular
    .module('pupilApp')
    .factory('Model', Model);

  Model.$inject = ['$http'];

  function Model($http) {

    var Model = {
      get_file_list: get_file_list,
      move: move
    };

    return Model;


    function get_file_list(callback) {
        var url = 'get_file_list'
        return $http.get(url).then(callback);
    };

    function move(act,id,callback) {
      var url = 'move/'+act+'/'+id;
      return $http.get(url).then(callback);
    };




  }



})();
