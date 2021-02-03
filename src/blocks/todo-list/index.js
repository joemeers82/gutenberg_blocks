
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from "./edit";

registerBlockType('cp-blocks/todo-list', {
	title: __('Redux Todo', 'cp-blocks'),
	description: __('A todo list', 'cp-blocks'),
	icon: 'editor-ul',
	category: 'cp_blocks-category',
	edit: edit,
	save() {
		return null;
	},
});