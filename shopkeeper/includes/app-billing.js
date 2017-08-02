/**
  * Angular JS App module for Shopkeeper, the billing app
  * Designed and Developed by Joble Jose, under MIT license
  * http://joble.in, github: @joble18
  * Should keep original developer credits while modifing
**/
  var app = angular.module("myShoppingList", ["ngTouch", "angucomplete"]); 
  app.controller("myCtrl", function($scope, $http, $window) {
      $http.get("shopkeeper.php").then(function(response) {
        $scope.products = response.data;
      });

      
      $scope.billNo = Math.floor(1000 + Math.random() * 9000);

      $scope.productcart =  [];
      $scope.total = 0.00;
      $scope.count = 0;
      $( "#ex1_value" ).focus();

      $scope.addItem = function () {

          $scope.errortext = "";
          if (!$scope.addQuantity) {return;}
          if ($scope.productcart.indexOf($scope.addQuantity) == -1) {
              $scope.productcart.push({item:$scope.selectedProduct.originalObject.product, size:$scope.selectedProduct.originalObject.size, price:$scope.selectedProduct.originalObject.price, quantity:$scope.addQuantity, subtotal:$scope.selectedProduct.originalObject.price*$scope.addQuantity});
              $scope.total += $scope.selectedProduct.originalObject.price*$scope.addQuantity;



              // reset form
              
              document.getElementById("cartForm").reset();
              $( "#ex1_value" ).focus();
              $( "#ex1_value" ).select();

          } else {
              $scope.errortext = "The item is already in your shopping list.";
          }
      }
      $scope.removeItem = function (x) {
          $scope.errortext = "";    
          $scope.total -= $scope.productcart[x].subtotal;
          $scope.productcart.splice(x, 1);
      }

      $scope.printBill = function(elem) {
        window.print();
      }

      $scope.newBill = function(){
        location.reload();
      }

      $scope.getDate = function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var datetoday = dd+'/'+mm+'/'+yyyy;
        $scope.billDate = datetoday;
      }

      $scope.getDate();

  });