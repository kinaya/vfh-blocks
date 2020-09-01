<?php
/**
 * Plugin Name:     VFH Latest Posts
 * Version:         0.1.0
 * Text Domain:     vfh-blocks
 *
 * @package         vfh-blocks
 */

 function vfh_latest_posts_render_callback( $block_attributes, $content ) {
     $posts = wp_get_recent_posts( array(
         'numberposts' => 3,
         'post_status' => 'publish',
     ) );
     if ( count( $posts ) === 0 ) {
         return 'No posts';
     }

	 	 $output .= '<div class="vfh-blocks-vfh-latest-posts">';
     $output .= '<h5 class="block-heading">Latest posts</h5>';
     $output .= '<div class="grid">';
  		 foreach($posts as $post) {
  			 $url = get_permalink($post['ID']);
  			 $output .= '<div class="post">';
  			 $output .= '<h4><a href="'. $url.'">'. $post['post_title'] .'</a></h4>';
  			 $output .= '<p>'. $post['post_excerpt'] .'</p>';
  			 $output .= '</div>';
  		 }
		 $output .= "</div></div>";

 		 return $output;
 }

function vfh_latest_posts_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "vfh-blocks/vfh-latest-posts" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'vfh-latest-posts-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'vfh-latest-posts-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'vfh-latest-posts-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'vfh-blocks/vfh-latest-posts', array(
		'editor_script' => 'vfh-latest-posts-block-editor',
		'editor_style'  => 'vfh-latest-posts-block-editor',
		'style'         => 'vfh-latest-posts-block',
		'render_callback' => 'vfh_latest_posts_render_callback'
	) );
}
add_action( 'init', 'vfh_latest_posts_block_init' );
