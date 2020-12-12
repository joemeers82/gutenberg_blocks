 <?php
/**
 * Plugin Name:     CHECKPOINT GUTENBERG BLOCKS
 * Plugin URI:      Checkpoint.com
 * Description:     Gutenberg Blocks for Checkpoint.com
 * Author:          Check Point Digital Marketing
 * Author URI:      Checkpoint.com
 * Text Domain:     cp-blocks
 * Domain Path:     Checkpoint.com
 * Version:         0.1.0
 *
 * @package         CP_Blocks
 */

// Your code starts here.

if( !function_exists('add_action' ) ){
	echo 'You are not allowed to be here';
	exit;
}

function cp_blocks_register_block_type($block, $options= array() ){
	register_block_type(
		'cp-blocks/'. $block,
		array_merge(
			array(
				'editor_script'=>'cp-blocks-editor-script',
				'editor_style' =>'cp-blocks-editor-style',
				'script' =>'cp-blocks-script',
				'style' =>'cp-blocks-style',
			),
			$options
		)
	);
}

//setup
define ('CP_BLOCKS_PLUGIN_URL', __FILE__ );

function cp_blocks_register(){

	wp_register_script(
		'cp-blocks-editor-script', 
		plugins_url('dist/editor.js', __FILE__),
		array('wp-blocks', 'wp-i18n', 'wp-element')
	);
	
	wp_register_script(
		'cp-blocks-script', 
		plugins_url('dist/script.js', __FILE__),
		array('jquery')
	);

	wp_register_style(
		'cp-blocks-editor-style',
		plugins_url('dist/editor.css', __FILE__),
		array('wp-edit-blocks')
	);

	wp_register_style(
		'cp-blocks-style',
		plugins_url('dist/style.css', __FILE__)
	);

	cp_blocks_register_block_type('firstblock');
	cp_blocks_register_block_type('secondblock');
}

add_action('init', 'cp_blocks_register');