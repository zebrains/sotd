var lizopedia = angular.module("lizopedia", []);

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

lizopedia.directive("articleForm", function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "article-form.html"
  };
});

lizopedia.directive("articleBody", function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "article-body.html"
  };
});

lizopedia.directive("articleEdit", function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "article-edit.html"
  };
});

//Controller
lizopedia.controller("ArticleController", function($scope, $http){

    $scope.isEditing = false;

    $scope.article = {};

    $scope.editArticle = {};

    $http.get("./php/getArticles.php")
      .success(function(response) {
        $scope.articles = response;
      });

/*    $scope.articles = [
      {
        "title": "Bonacles",
        "content": "muah!",
        "editing": false
      },
	    {
        "title": "Noises",
        "content": "while in",
        "editing": false
      }
    ];
*/
    $scope.addArticle = function(){
      // Add new article via addArticle.php
      $http({
        url: "./php/addArticle.php",
        method: "GET",
        params: {
          "title": this.article.title,
          "content": this.article.content
        }
      });
      $scope.articles.push(this.article);
      this.article = {};
    };

    $scope.editArticle = function(article){
      // Some aliasing for ease of reading.
      var articles = $scope.articles;

      //$scope.editArticle = article;
      $scope.editArticle.title = articles[articles.indexOf(article)].title;
      $scope.editArticle.content =  articles[articles.indexOf(article)].content;
      articles[articles.indexOf(article)].editing = true;
      $scope.isEditing = true;
    };

    $scope.submitArticleChanges = function(article){
      // Some aliasing for ease of reading.
      var articles = $scope.articles;

      $http({
        url: "./php/editArticle.php",
        method: "GET",
        params: {
          "id": articles[articles.indexOf(article)].id,
          "title": $scope.editArticle.title,
          "content": $scope.editArticle.content
        }
      });

      articles[articles.indexOf(article)].title = $scope.editArticle.title;
      articles[articles.indexOf(article)].content = $scope.editArticle.content;
      articles[articles.indexOf(article)].editing = false;
      $scope.isEditing = false;
    };

});
