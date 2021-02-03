
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from "./edit";

registerBlockType('cp-blocks/redux', {
	title: __('Redux Test', 'cp-blocks'),
	description: __('Block Showing Redux', 'cp-blocks'),
	icon: 'admin-post',
	category: 'cp_blocks-category',
	edit: edit,
	save() {
		return null;
	},
});