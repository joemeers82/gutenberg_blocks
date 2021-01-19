import './styles.editor.scss';
import './parent';
import { registerBlockType } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";
import edit from "./edit";

const attributes = {
	title: {
		type: 'string',
		source: 'html',
		selector: 'h4'
	},
	info: {
		type: 'string',
		source: 'html',
		selector: 'p'
	},
	id: {
		type: 'number'
	},
	alt: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'alt',
		default: ''
	},
	url: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'src',
	},
	social: {
		type: 'array',
		default: [],
		source: 'query',
		selector: '.wp-block-cp-blocks-team-member__social  ul li',
		query: {
			icon: {
				source: 'attribute',
				attribute: 'data-icon'
			},
			link: {
				source: 'attribute',
				selector: 'a',
				attribute: 'href'
			}
		}
	},
}


registerBlockType('cp-blocks/team-member',{
	title: __('Team Member', 'cp-blocks'),
	
	description: __('Block showing a team member', 'cp-blocks' ),
	
	icon: 'admin-users',

	parent: ['cp-blocks/team-members'],

	supports: {
		reusable: false,
		html: false
	},
	
	category: 'cp_blocks-category',
	
	keywords: [__('team','cp-blocks'),__('member','cp-blocks'),__('person','cp-blocks')],
	
	attributes,
	
	save: ( {attributes} )=>{
		const { title, info, url, alt, id, social } = attributes;
		return (
			<div>
			{url && 
				<img src={url} alt={alt} className={ id ? `wp-image-${id}` : null }/>
			}
				{title && 
					<RichText.Content
						className={'wp-block-cp-blocks-team-member__title'}
						tagName = "h4"
						value={ title }
					/>
				}
				{info && 
					<RichText.Content
						className={'wp-block-cp-blocks-team-member__info'}
						tagName = "p"
						value={ info  }
					/>
				}

				{ social.length > 0 && 
					<div className={'wp-block-cp-blocks-team-member__social'}>
						<ul>
							{social.map((item, index)=>{
								return (
									<li key={index} data-icon={item.icon}>
										<a href={item.link} target="_blank" rel="noopener noreferrer">
											<Dashicon icon={item.icon} size={16} ></Dashicon>
										</a>
									</li>
								)
							})}
						</ul>
					</div>
				}
			</div>
		)
	},
	
	edit

});