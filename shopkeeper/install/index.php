<?php

include "../config.php";
// Name of the file
$filename = 'shopkeeper.sql';
// MySQL host
$mysql_host = $servername;
// MySQL username
$mysql_username = $username;
// MySQL password
$mysql_password = $password;
// Database name
$mysql_database = $dbname;
//Table name
$mysql_table = 'products';

// Connect to MySQL server
mysql_connect($mysql_host, $mysql_username, $mysql_password) or die('Error connecting to MySQL server: ' . mysql_error());
// Select database
//mysql_select_db($mysql_database) or die('Error selecting MySQL database: ' . mysql_error());
$db_selected = mysql_select_db($mysql_database);

if (!$db_selected) {
  // If we couldn't, then it either doesn't exist, or we can't see it.
  $sql = 'CREATE DATABASE ' . $mysql_database;

  if (mysql_query($sql)) {
      echo "Database ".$mysql_database." created successfully\n";
  } else {
      echo 'Error creating database: ' . mysql_error() . "\n";
  }
}

else {
	echo "<br>Database exists\n";
}

mysql_select_db($mysql_database) or die('<br>Error selecting MySQL database: ' . mysql_error());

$sql = 'SELECT * FROM ' . $mysql_table;
  if (mysql_query($sql)) {
      echo "<br>Relation " . $mysql_table . " exists\n<br>Previous installation found\n";
  } else {
      echo '<br>Creating relation ' . $mysql_table . "\n";

// Temporary variable, used to store current query
$templine = '';
// Read in entire file
$lines = file($filename);
// Loop through each line
foreach ($lines as $line)
{
// Skip it if it's a comment
if (substr($line, 0, 2) == '--' || $line == '')
    continue;

// Add this line to the current segment
$templine .= $line;
// If it has a semicolon at the end, it's the end of the query
if (substr(trim($line), -1, 1) == ';')
{
    // Perform the query
    mysql_query($templine) or print('<br>Error performing query \'<strong>' . $templine . '\': ' . mysql_error() . '<br /><br />');
    // Reset temp variable to empty
    $templine = '';
}
}
 echo "<br>Realtion created<br>Installation finished successfully";
}
?>