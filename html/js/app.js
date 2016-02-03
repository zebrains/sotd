var lizopedia = angular.module("shirtoftheday", []);

//Directives

lizopedia.directive("topBar", function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "top-bar.html"
  };
});

lizopedia.directive("jumboTron", function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "jumbotron.html"
  };
});

lizopedia.directive("shirtsFrame", function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "shirts-frame.html"
  };
});

lizopedia.directive("shirtBody", function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "shirt-body.html"
  };
});

lizopedia.directive("zoomFrame", function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "zoom-frame.html"
  };
});


//Controller
lizopedia.controller("ShirtController", function($scope, $http){

  $scope.shirt = {};
  $scope.shirts = [];
  $scope.selectedShirtIndex = 0;

  $scope.zoomModal = function(index){
    $scope.selectedShirtIndex = index;
    console.log("Open Modal Triggered for index "+index);
    $("#imageModal").modal();
  }



  $http.get("./getShirts")
    .success(function(response) {
      $scope.shirts = response;
      //console.log(response);
    })
    .error(function(response) {
      $scope.shirts = [
        {
          "title": "Non Existant",
          "image": "images/missing.jpg"
        }
      ]
    });
});
