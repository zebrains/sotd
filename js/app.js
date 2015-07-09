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


//Controller
lizopedia.controller("ShirtController", function($scope, $http){

    $scope.shirt = {};
    $scope.shirts = [];

    $http.get("./php/yetee.php")
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
      }
      );


});
