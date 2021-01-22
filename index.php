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

function cp_blocks_categories($categories, $post ){
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'cp_blocks-category',
				'title' => __('CP Blocks Category', 'cp-blocks'),
				'icon'  => 'wordpress'
			)
		)
	);
}

add_filter('block_categories', 'cp_blocks_categories', 10,2);

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
		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor','wp-components', 'lodash', 'wp-blob','wp-data','wp-html-entities')
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
	cp_blocks_register_block_type('team-member');
	cp_blocks_register_block_type('team-members');
	cp_blocks_register_block_type('latest-posts',array(
		'render_callback' => 'cp_blocks_render_latest_posts_block',
		'attributes' => array(
			'numberOfPosts'=> array(
				'type' => 'number',
				'default' => 5
			),
			'postCategories' => array(
				'type'=> 'string'
			)
		)
	));
}

add_action('init', 'cp_blocks_register');

function cp_blocks_render_latest_posts_block( $attributes ) {
	$args = array(
		'posts_per_page' => $attributes['numberOfPosts']
	);
	if($attributes['postCategories']) {
		$args['cat'] = $attributes['postCategories'];
	};
	$query = new WP_Query($args);
	$posts = '';

	if($query->have_posts()){
		$posts .= '<ul class="wp-blocks-cp-blocks-blocks-latest-posts">';
		while($query->have_posts()){
			$query->the_post();
			$posts .= '<li><a href"'.esc_url(get_the_permalink()). '">'. get_the_title().'</a></li>';
		}
		$posts .= '</ul>';
		wp_reset_postdata();
		return $posts;
	}
	else {
		return '<div>'.__('No Posts Found', 'cp-blocks').'</div>';
	}
}










