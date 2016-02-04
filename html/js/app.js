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

lizopedia.filter('caps', function() {
    return function(input, scope) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

//Controller
lizopedia.controller("ShirtController", function($scope, $http){

  $scope.shirt = {};
  $scope.shirts = [];
  $scope.selectedShirtIndex = 0;
  $scope.sorting = 'latest';

  $scope.zoomModal = function(index){
    $scope.selectedShirtIndex = index;
    console.log("Open Modal Triggered for index "+index);
    $("#imageModal").modal();
  }

  $scope.sortByPrice = function(){
    console.log("Sorting by price");
    $http({
      method  : "GET",
      url     : "./getShirts",
      params  : {
        sorting: "price"
      }
    })
    .then(
    function success(response){
      console.log("Success");
      $scope.shirts = response.data;
      $scope.sorting = "price";
    },
    function error(response){
      $scope.shirts = [
        {
          "title": "Non Existant",
          "image": "images/missing.jpg"
        }
      ]
    });
  }

  $scope.sortByLatest = function(){
    console.log("Sorting by latest");

    $http({
      method  : "GET",
      url     : "./getShirts",
      params  : {
        sorting: "latest"
      }
    })
    .then(
    function success(response){
      console.log("Success");
      $scope.shirts = response.data;
      $scope.sorting = "latest";
    },
    function error(response){
      $scope.shirts = [
        {
          "title": "Non Existant",
          "image": "images/missing.jpg"
        }
      ]
    });
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
