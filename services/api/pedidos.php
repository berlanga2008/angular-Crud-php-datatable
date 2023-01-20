<?php
require_once('../../wp-config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$url = $_SERVER['REQUEST_URI'];
$url = explode("/", $url);
$id = $url[count($url) - 1];


if ($con) {
  //echo "Conectado";
  $response = array();
  $sql = "SELECT
  p.ID as order_id,
  p.post_date,
  max( CASE WHEN pm.meta_key = '_billing_email' and p.ID = pm.post_id THEN pm.meta_value END ) as billing_email,
  max( CASE WHEN pm.meta_key = '_billing_first_name' and p.ID = pm.post_id THEN pm.meta_value END ) as
  _billing_first_name,
  max( CASE WHEN pm.meta_key = '_billing_last_name' and p.ID = pm.post_id THEN pm.meta_value END ) as _billing_last_name,
  max( CASE WHEN pm.meta_key = '_billing_address_1' and p.ID = pm.post_id THEN pm.meta_value END ) as _billing_address_1,
  max( CASE WHEN pm.meta_key = '_billing_address_2' and p.ID = pm.post_id THEN pm.meta_value END ) as _billing_address_2,
  max( CASE WHEN pm.meta_key = '_billing_city' and p.ID = pm.post_id THEN pm.meta_value END ) as _billing_city,
  max( CASE WHEN pm.meta_key = '_billing_state' and p.ID = pm.post_id THEN pm.meta_value END ) as _billing_state,
  max( CASE WHEN pm.meta_key = '_billing_postcode' and p.ID = pm.post_id THEN pm.meta_value END ) as _billing_postcode,
  max( CASE WHEN pm.meta_key = '_shipping_first_name' and p.ID = pm.post_id THEN pm.meta_value END ) as
  _shipping_first_name,
  max( CASE WHEN pm.meta_key = '_shipping_last_name' and p.ID = pm.post_id THEN pm.meta_value END ) as
  _shipping_last_name,
  max( CASE WHEN pm.meta_key = '_shipping_address_1' and p.ID = pm.post_id THEN pm.meta_value END ) as
  _shipping_address_1,
  max( CASE WHEN pm.meta_key = '_shipping_address_2' and p.ID = pm.post_id THEN pm.meta_value END ) as
  _shipping_address_2,
  max( CASE WHEN pm.meta_key = '_shipping_city' and p.ID = pm.post_id THEN pm.meta_value END ) as _shipping_city,
  max( CASE WHEN pm.meta_key = '_shipping_state' and p.ID = pm.post_id THEN pm.meta_value END ) as _shipping_state,
  max( CASE WHEN pm.meta_key = '_shipping_postcode' and p.ID = pm.post_id THEN pm.meta_value END ) as _shipping_postcode,
  max( CASE WHEN pm.meta_key = '_order_total' and p.ID = pm.post_id THEN pm.meta_value END ) as order_total,
  max( CASE WHEN pm.meta_key = '_order_tax' and p.ID = pm.post_id THEN pm.meta_value END ) as order_tax,
  max( CASE WHEN pm.meta_key = '_paid_date' and p.ID = pm.post_id THEN pm.meta_value END ) as paid_date,
  ( select group_concat( order_item_name separator '|' ) from wp_woocommerce_order_items where order_id = p.ID ) as
  order_items
  FROM
  wp_posts p
  join wp_postmeta pm on p.ID = pm.post_id
  join wp_woocommerce_order_items oi on p.ID = oi.order_id
  WHERE
  post_type = 'shop_order' and
  post_status = 'wc-completed'
  group by
  p.ID;";


  $result = mysqli_query($con, $sql);
  if ($result) {
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {

      $response[$i]['order_id'] = $row['order_id'];
      $response[$i]['post_date'] = $row['post_date'];
      $response[$i]['billing_email'] = $row['billing_email'];
      $response[$i]['_billing_first_name'] = $row['_billing_first_name'];
      $response[$i]['_billing_last_name'] = $row['_billing_last_name'];
      $response[$i]['order_total'] = $row['order_total'];
      $response[$i]['order_items'] = $row['order_items'];
      $i++;
    }
    
    $show_json = json_encode($response , JSON_FORCE_OBJECT);
    if ( json_last_error_msg()=="Malformed UTF-8 characters, possibly incorrectly encoded" ) {
        $show_json = json_encode($response, JSON_PARTIAL_OUTPUT_ON_ERROR );
    }
    if ( $show_json !== false ) {
        echo($show_json);
    } else {
        die("json_encode fail: " . json_last_error_msg());
    }

  }
} else {
  echo "problema conexión";
}