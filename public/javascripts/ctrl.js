app.controller('sortCtrl',['$scope', 'Model', function($scope, Model){


    Model.get_file_list(function(rezult){
       $scope.current = 1;
       $scope.file_list = rezult.data;
       $scope.current_xml = parsexml(rezult.data[$scope.current].content);
       console.log($scope.current_xml);
   });


   function parsexml(data){
       var xmlDoc = $.parseXML(data)
       var x = $( xmlDoc );
       xm = {};
       xm.n_grz = x.find('n_grz').text();
       xm.n_date = x.find('n_date').text();
       xm.n_time = x.find('n_time').text();
       xm.photo_front = x.find('photo_front').text();
       xm.photo_grnz = x.find('photo_grnz').text();
       xm.photo_grnz_num = x.find('photo_grnz_num').text();
       return xm;
   };


   $scope.reread = function(){
       Model.get_file_list(function(rezult){
          $scope.current = 1;
          $scope.file_list = rezult.data;
          $scope.current_xml = parsexml(rezult.data[$scope.current].content);
          console.log($scope.current_xml);
          delete $scope.is_end;
       });
   };

   $scope.process = function(act,id){



       Model.move(act,id,function(rezult){

          $scope.current = $scope.current+1;
          console.log($scope.file_list['count']);
          if($scope.file_list['count']<$scope.current){
              $scope.is_end = true;
          }
          $scope.current_xml = parsexml($scope.file_list[$scope.current].content);
       });


   };


}])
