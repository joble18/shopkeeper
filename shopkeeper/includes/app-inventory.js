/**
  * Angular JS App module for Shopkeeper, the billing app
  * Designed and Developed by Joble Jose, under MIT license
  * http://joble.in, github: @joble18
  * Should keep original developer credits while modifing
**/
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
          price: $scope.addPriceField
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
          price: $scope.editPriceField
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