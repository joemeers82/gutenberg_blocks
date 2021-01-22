import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";


const attributes = {
	columns: {
		type: 'number',
		default: 2
	}
}

registerBlockType('cp-blocks/team-members',{
	title: __('Team Members', 'cp-blocks'),
	
	description: __('Block showing team members', 'cp-blocks' ),
	
	icon: 'grid-view',
	
	category: 'cp_blocks-category',
	
	supports: {
		html: false,
		align: ['wide','full']
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/gallery'],
				transform: ({columns, images})=>{
					let inner = images.map(({alt,id,url})=>createBlock('cp-blocks/team-member',{alt,id,url}))
					return createBlock('cp-blocks/team-members',{
						columns: columns
					},inner)
				}
			},
			{
				type: 'block',
				blocks: ['core/image'],
				isMultiBlock: true,
				transform: (attributes)=>{
					let inner = attributes.map(({alt,id,url})=>createBlock('cp-blocks/team-member',{alt,id,url}))
					return createBlock('cp-blocks/team-members',{
						columns: 3
					},inner)
				}
			}
		]
	},
	keywords: [__('team','cp-blocks'),__('member','cp-blocks'),__('person','cp-blocks')],

	attributes,

	edit( { className, attributes, setAttributes } ) {
		const { columns } = attributes;
		return (
			<div className={ `${className} has-${columns}-columns` }>
				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={__('Columns', 'cp-blocks')}
							value={ columns }
							onChange= { (columns)=> setAttributes({columns})}
							min= {1}  
							max= {6}
						>
							
						</RangeControl>
					</PanelBody>

				</InspectorControls>
				<InnerBlocks 
					allowedBlocks={ ['cp-blocks/team-member']}
					template={[
						['cp-blocks/team-member'],
						['cp-blocks/team-member'],
					]}
				/>
			</div>
		)
	},

	save( {attributes} ) {
		const { columns } = attributes;
		return (
			<div className={ `has-${columns}-columns` }>
				<InnerBlocks.Content />
			</div>
		)
	}
})