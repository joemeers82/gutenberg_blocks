import edit from './edit';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType('cp-blocks/latest-posts', {
	title: __('Latest Posts 2', 'cp-blocks'),
	description: __('Block Showing Latest Posts', 'cp-blocks'),
	icon: 'admin-post',
	category: 'cp_blocks-category',
	edit:edit,

	save() {
		return null;
	},
});