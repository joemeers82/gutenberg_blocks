<?php 

function cp_blocks_register_meta() {
	register_meta('post', '_cp_block_post_subtitle', array(
		'show_in_rest' => true,
		'type'   => 'string',
		'single' => true,
		'sanitze_callback' => 'sanitze_text_field',
		'auth_callback' => function() {
			return current_user_can('edit_posts');
		}
	));
}
add_action('init', 'cp_blocks_register_meta');

function cp_blocks_add_meta_box(){
	add_meta_box(
		'cp_blocks_post_options_metabox',
		'Post Options',
		'cp_blocks_post_options_metabox_html',
		'post',
		'normal',
		'default',
		array('__back_compat_meta_box' => true)
	);
}


add_action('add_meta_boxes', 'cp_blocks_add_meta_box');



function cp_blocks_post_options_metabox_html($post) {
	$subtitle = get_post_meta($post->ID, '_cp_block_post_subtitle', true);
	wp_nonce_field('cp_blocks_update_meta_box', 'cp_blocks_update_post_nonce');
	?>
	<p>
		<label for="cp_block_post_subtitle_field"><?php esc_html_e('Post Subtitle', 'cp_blocks' ); ?></label>
		<br />
		<input class="widefat" type="text" name="cp_block_post_subtitle_field" value="<?php echo esc_attr($subtitle); ?>" />
	</p>
	<?php
}

function cp_blocks_save_post_metabox($post_id,$post) {
	$edit_cap = get_post_type_object( $post->post_type )->cap->edit_post;

	if(!current_user_can($edit_cap, $post_id )) {
		return;
	}

	if( !isset( $_POST['cp_blocks_update_post_nonce']) || !wp_verify_nonce( $_POST['cp_blocks_update_post_nonce'],'cp_blocks_update_post_metabox' )) {
		return;
	}

	if(array_key_exists('cp_blocks_post_subtitle_field', $_POST)) {
		update_post_meta(
			$post_id,
			'_cp_block_post_subtitle',
			sanitize_text_field($_POST['cp_blocks_post_subtitle_field'])
		);
	}
}

add_action('save_post', 'cp_blocks_save_post_metabox', 10, 2 );