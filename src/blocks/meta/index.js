
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

registerBlockType('cp-blocks/meta', {
	title: __('Meta', 'cp-blocks'),
	description: __('Meta', 'cp-blocks'),
	icon: 'admin-tools',
	category: 'cp_blocks-category',
	attributes: {
		post_subtitle: {
			type: 'string',
			source: 'meta',
			meta: '_cp_block_post_subtitle'
		}
	},
	edit({attributes, setAttributes}){
		function onChange(value) {
			setAttributes({post_subtitle: value});
		}

		return (
			<div>
				<TextControl
					label={__('Post Subtitle', 'cp-blocks')}
					value={ attributes.post_subtitle }
					onChange = { onChange}
				>
					
				</TextControl>
			</div>
		)
	},
	save() {
		return null;
	},
});