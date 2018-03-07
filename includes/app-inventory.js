  var app = angular.module('inventoryApp', []);
  app.controller('productsCtrl', function($scope, $http) {

    $scope.listProducts = function() {
      $http.get("shopkeeper.php").then(function(response) {
        $scope.products = response.data;
      });
    }
    
    $("#editProductForm").hide();
    $("#success-alert").hide();
    $scope.listProducts();

    $scope.addProduct = function() {
 
      var request = $http({
      method: "post",
      url: "shopkeeper.php?add",
      data: {
          product: $scope.addProductField,
          size: $scope.addSizeField,
          price: $scope.addPriceField,
          cgst: $scope.addCgstField,
          sgst: $scope.addSgstField,
          igst: $scope.addIgstField
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      /* Check whether the HTTP Request is successful or not. */
      request.success(function (data) {
          $scope.status = "Success, "+data;
          $("#success-alert").alert();
          $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#success-alert").slideUp(500);
          }); 
          $scope.listProducts();
          document.getElementById("addProductForm").reset();
          $( "#addItem" ).focus();
      });

    }

    $scope.editProduct = function(x) {
      //document.getElementById("editProductForm").reset();
      $("#addProductForm").hide();
      $("#editProductForm").hide();
      $("#editProductForm").fadeIn("slow");
      $scope.editProductIdField = x.product_id;
      $scope.editProductField = x.product;
      $scope.editSizeField = x.size;
      $scope.editPriceField = x.price;
      $scope.editCgstField = x.cgst;
      $scope.editSgstField = x.sgst;
      $scope.editIgstField = x.igst;
      return true;
    }

    $scope.cancelEdit = function(){
      document.getElementById("editProductForm").reset();
      $("#editProductForm").hide();
      $("#addProductForm").fadeIn("slow");
    }

    $scope.updateProduct = function(){
      var request = $http({
      method: "post",
      url: "shopkeeper.php?update",
      data: {
          product_id: $scope.editProductIdField,
          product: $scope.editProductField,
          size: $scope.editSizeField,
          price: $scope.editPriceField,
          cgst: $scope.editCgstField,
          sgst: $scope.editSgstField,
          igst: $scope.editIgstField
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      /* Check whether the HTTP Request is successful or not. */
      request.success(function (data) {
          $scope.status = "Success, "+data;
          $scope.successAlert();
          $scope.listProducts();
          $scope.cancelEdit();
      });
    }

    $scope.removeProduct = function(x) {
      var request = $http({
      method: "post",
      url: "shopkeeper.php?delete",
      data: {
          product_id: x.product_id
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      /* Check whether the HTTP Request is successful or not. */
      request.success(function (data) {
          $scope.status = "Success, "+data;
          $scope.successAlert();
          $scope.listProducts();
      });
    }

    $scope.successAlert = function(){
        $("#success-alert").alert();
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#success-alert").slideUp(500);
        });
    }

  });