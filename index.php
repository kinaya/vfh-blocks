<?php

/**
 * Plugin Name: VFH blocks
 * Description: Plugin adding new blocks for the Gutenberg editor.
 * Version: 1.0
 *
 * @package vfh-blocks
 */

defined( 'ABSPATH' ) || exit;

/*
* Custom category for blocks
*/
add_filter('block_categories', function( $categories, $post ) {
  return array_merge(
    $categories,
    array(
      array(
        'slug'  => 'vfh',
        'title' => 'VFH',
      ),
    )
  );
}, 10, 2 );

include 'recommended/index.php';
include 'latest-posts/index.php';
