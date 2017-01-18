angular.module("angularProject").directive('homePageDirective', function ($http) {
  return {
    restrict: "AE",
    templateUrl: "home-page-directive.html",
    controller: function ($scope, $http) {
      $scope.updateCommentData = function () {
        $scope.dummy_data.push({ img: "images/unknown.jpg", comment: $scope.comment })
       $scope.comment="";
        $http.post('/commentdata', $scope.dummy_data)
          .success(function (res) {
            console.log(res);
          });

      }


      $http({
        method: "GET",
        url: "/commentdata"
      }).then(function mySucces(response) {
        $scope.dummy_data = response.data;
      }, function myError(response) {
        $scope.dummy_data = response.statusText;
      });

    }

  }

});

angular.module("angularProject").directive('corousalDiv', function () {
  return {
    restrict: "E",
    templateUrl: "corousal-div.html"}
});

