<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('definedb.php');

$con =mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

if($con){
    //echo "Conectado";
    $response =array();
    $sql = "select * from logs";
  //  $sql = "ALTER TABLE `logs` CHANGE `datos` `datos` VARCHAR(2900) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL;";
  //  $sql = "CREATE TABLE `dbpfaikdt2cv39`.`logs` ( `id` INT NOT NULL AUTO_INCREMENT , `nombre` VARCHAR(20) NULL , `datos` VARCHAR(1000) NULL , `email` VARCHAR(100) NULL , `respuesta` VARCHAR(100) NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM;";
     //$sql = "INSERT INTO `logs` (`id`, `nombre`, `datos`, `email`, `respuesta`) VALUES (NULL, 'test', 'testdatos', 'testemail', 'respuestatest');";

    $result= mysqli_query($con,$sql);
    if ($result){
        $i=0;
        while($row =mysqli_fetch_assoc($result)) {
          /*   $response['historials'][$i]['id']= $row['id'];
             $response['historials'][$i]['nombre']= $row['nombre'];
             $response['historials'][$i]['datos']= $row['datos'];    */
          $response[$i]['id'] = $row['id'];
          $response[$i]['nombre'] = $row['nombre'];
          $response[$i]['datos'] = $row['datos'];
          $i++;
        }
      //  echo json_encode($response,JSON_PRETTY_PRINT);
        echo json_encode($response);
     // echo '{"historials":[{"id": 1,"nombre": "Tonygf Stark","datos": "tony@mcu.com"}]}';

    }
} else {
    echo "problema conexión";
}


