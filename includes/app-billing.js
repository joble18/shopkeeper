
  var app = angular.module("myShoppingList", ["ngTouch", "angucomplete"]); 
  app.controller("myCtrl", function($scope, $http, $window) {
      $http.get("shopkeeper.php").then(function(response) {
        $scope.products = response.data;
      });

      
      $scope.billNo = Math.floor(1000 + Math.random() * 9000);

      $scope.productcart =  [];
      $scope.total = 0.00;
      $scope.totalCGST = 0.00;
      $scope.totalSGST = 0.00;
      $scope.totalIGST = 0.00;
      $scope.rounded_total = 0;
      $scope.count = 0;
      $( "#ex1_value" ).focus();

      $scope.addItem = function () {

          $scope.errortext = "";
          if (!$scope.addQuantity) {return;}
          if ($scope.productcart.indexOf($scope.addQuantity) == -1) {
              $scope.roundedSubTotal = Math.round($scope.selectedProduct.originalObject.price*$scope.addQuantity*100) / 100;
              
              // Individual Product GST Calculation
              $scope.cgst_amount = $scope.roundedSubTotal * ($scope.selectedProduct.originalObject.cgst/100);
              $scope.sgst_amount = $scope.roundedSubTotal * ($scope.selectedProduct.originalObject.sgst/100);
              $scope.igst_amount = $scope.roundedSubTotal * ($scope.selectedProduct.originalObject.igst/100);

              $scope.productcart.push({item:$scope.selectedProduct.originalObject.product, size:$scope.selectedProduct.originalObject.size, price:$scope.selectedProduct.originalObject.price, quantity:$scope.addQuantity, subtotal:$scope.roundedSubTotal, cgst: $scope.cgst_amount, sgst: $scope.sgst_amount, igst: $scope.igst_amount});
              $scope.total += $scope.roundedSubTotal;
              $scope.totalCGST += $scope.cgst_amount;
              $scope.totalSGST += $scope.sgst_amount;
              $scope.totalIGST += $scope.igst_amount;
              
  

              console.log($scope.totalCGST);



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
          $scope.totalCGST -= $scope.productcart[x].cgst;
          $scope.totalSGST -= $scope.productcart[x].sgst;
          $scope.totalIGST -= $scope.productcart[x].igst;
          $scope.productcart.splice(x, 1);
      }

      // $scope.roundTotal = function(){
      //   var parsed = parseFloat($scope.total);

      //   if(parsed !== parsed) { return false; } // check for NaN
      //   var rounded = Math.round(parsed);
      //   $scope.rounded_total = rounded;
      //   return true;
      // }

      $scope.confirmBill = function() {
    
          $scope.total = Math.round($scope.total * 100) / 100;
          $scope.totalCGST = Math.round($scope.totalCGST*100) / 100;
          $scope.totalSGST = Math.round($scope.totalSGST*100) / 100;
          $scope.totalIGST = Math.round($scope.totalIGST*100) / 100;

          $scope.roundedGST = $scope.totalCGST + $scope.totalSGST + $scope.totalIGST;
          $scope.roundedGST = Math.round($scope.roundedGST*100) / 100;
          
          $scope.grandTotal = $scope.total + $scope.roundedGST; 
          $scope.grandTotal = Math.round($scope.grandTotal*100) / 100;

          $("#addItemSection").addClass("hidden");
          //$("#removeItemX").addClass("hidden");
          $("#confirmButton").addClass("hidden");
          $("#printButton").removeClass("hidden");
           
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