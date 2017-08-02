<?php
//header("Content-Type: application/json; charset=UTF-8");


class Shopkeeper {

	var $conn;

	function __construct() {
		$this->open_connection();
	}

	function __destruct() {
		$this->close_connection();
	}

	function open_connection() {
		include "config.php";
		// Create connection
		$this->conn = new mysqli($servername, $username, $password, $dbname);

		// Check connection
		if ($this->conn->connect_error) {
		    die("Connection failed: " . $this->conn->connect_error);
		} 
		//echo "Connected successfully";
	}

	function close_connection() {
		$this->conn->close();
	}

	function add_products($request) {

		$sql = "INSERT INTO products (product, size, price) VALUES ('$request->product', '$request->size', $request->price)";

		if ($this->conn->query($sql) === TRUE) {
		    echo "New record created successfully";
		} else {
		    echo "Error: " . $sql . "<br>" . $this->conn->error;
		}
	}

	function list_products() {
		$sql = "SELECT product_id, product, size, price FROM products order by product_id desc";
		$result = $this->conn->query($sql);

		$outp = array();
		$outp = $result->fetch_all(MYSQLI_ASSOC);

		echo json_encode($outp);
	}

	function update_product($request) {
		$sql = "UPDATE products SET product='$request->product', size='$request->size', price=$request->price WHERE product_id=$request->product_id";

		if ($this->conn->query($sql) === TRUE) {
		    echo "Record updated successfully";
		} else {
		    echo "Error updating record: " . $this->conn->error;
		}
	}

	function delete_product($request) {
		// sql to delete a record
		$sql = "DELETE FROM products WHERE product_id=$request->product_id";

		if ($this->conn->query($sql) === TRUE) {
		    echo "Record deleted successfully";
		} else {
		    echo "Error deleting record: " . $this->conn->error;
		}
	}

}

$inventory = new Shopkeeper;

if (isset($_GET['add'])) {

	/*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$inventory->add_products($request);

} elseif (isset($_GET['update'])) {

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$inventory->update_product($request);

} elseif (isset($_GET['delete'])) {

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$inventory->delete_product($request);

} else {
	$inventory->list_products();
}




?>
