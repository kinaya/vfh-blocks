<?php
/**
 * Plugin Name:     VFH Recommended
 * Text Domain:     vfh
 *
 * @package         vfh-blocks
 */

function vfh_recommended_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "vfh-recommended" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'vfh-recommended-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'vfh-recommended-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'vfh-recommended-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'vfh-blocks/vfh-recommended', array(
		'editor_script' => 'vfh-recommended-block-editor',
		'editor_style'  => 'vfh-recommended-block-editor',
		'style'         => 'vfh-recommended-block',
	) );
}
add_action( 'init', 'vfh_recommended_block_init' );
