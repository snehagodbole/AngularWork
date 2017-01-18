// Code goes here
var app = angular.module("angularProject", []);
app.controller("TabController", function ($scope) {
  $scope.tab = 1;
  $scope.dropdown_options = ["popularity", "year"];
  $scope.isSelected = function (val) {

    if (val == $scope.tab) {
      return true;
    } else return false;
  };


  $scope.setTab = function (newValue) {
    $scope.tab = newValue;
  };

  $scope.isSet = function (tabName) {
    return $scope.tab === tabName;
  };
  $scope.dropdown_click = function (val) {
    console.log(val);

  }

});


app.directive("myListDirective", function ($http) {
  return {
    restrict: "AE",
    templateUrl: "my-list-directive.html",
    controller: function ($scope, $http) {
      $scope.data = {};
      $scope.pageEntry = 0;
      $scope.flag = [];
      $scope.numberOfPages = 0;
      $scope.index = 1;
      $scope.recordIndex = 0;
      $scope.activePage = 0;
      $scope.toggle = function (param) {
        $scope.flag[param] = !$scope.flag[param];
      }
      $scope.getNumber = function (num) {
        console.log(num);
        $scope.numberArray = new Array(num);
        return $scope.numberArray;
      }

      $scope.getPrevPages = function () {
        console.log("index" + $scope.index)
        $scope.index = $scope.index - 1;
        $scope.getNewData($scope.index, 0);
      };

      $scope.getNextPages = function () {
        console.log($scope.index)
        $scope.index = $scope.index + 1;
        $scope.getNewData($scope.index, 0);
      };
      $scope.getNewData = function (startIndex, newIndex) {
        $scope.recordIndex = startIndex;
        console.log("in new data index", startIndex, newIndex)
        $scope.pageEntry = startIndex * 20;
        if (newIndex == 0) {
          $scope.number_of_list = newIndex * $scope.pageEntry;
        }

        else

          $scope.number_of_list = $scope.index * $scope.pageEntry;
        $scope.newData = $scope.data.slice($scope.pageEntry);
        console.log("index", $scope.pageEntry, $scope.index)
        if (newIndex == 0)
          $scope.activePage = newIndex;
        else
          $scope.activePage = startIndex;
      };

      $scope.isActive = function (tabName) {
        return $scope.activePage === tabName;
      };

      $scope.calculateRating = function () {
        for (var i = 0; i < $scope.data.length; i++) {
          _temp = parseInt($scope.data[i].worldwide_gross.replace(/,/g, '').substr(1));

          switch (true) {
            case (_temp > 100000000):
              //console.log(_temp);
              $scope.data[i].rate = 5;
              break;
            case (_temp > 80000000 && _temp < 100000000):
              // console.log(_temp);
              $scope.data[i].rate = 4;
              break;
            case (_temp > 50000000 && _temp < 80000000):
              //console.log(_temp);
              $scope.data[i].rate = 3;
              break;
            case (_temp > 30000000 && _temp < 50000000):
              //console.log(_temp);
              $scope.data[i].rate = 3;
              break;
            case (_temp > 5000000 && _temp < 30000000):
              //console.log(_temp);
              $scope.data[i].rate = 2;
              break;
            case (_temp < 5000000):
              //console.log(_temp);
              $scope.data[i].rate = 1;
              break;

          }

        }
      };

      $http({
        method: "GET",
        url: "/moviedata"
      }).then(function mySucces(response) {
        console.log(response.data);
        $scope.data = response.data;
        $scope.calculateRating();
        $scope.numberOfPages = parseInt(($scope.data.length % $scope.pageEntry) == 0 ? $scope.data.length / 20 : $scope.data.length / 20 + 1);
        $scope.newData = $scope.data.slice($scope.pageEntry);
        //console.log($scope.data);
      }, function myError(response) {
        $scope.data = response.statusText;
      });


    }
  }

});





