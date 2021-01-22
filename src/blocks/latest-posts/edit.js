import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { decodeEntities } from "@wordpress/html-entities";
import { RangeControl, PanelBody, SelectControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";


class LatestPostsEdit extends Component {
	onChangeNumberOfPosts = (numberOfPosts)=>{
		this.props.setAttributes({numberOfPosts})
	}
	onChangeCategories = (categories)=>{
		this.props.setAttributes({postCategories: categories.join(',')})
	}

	render() {
		const { posts, categories, className, attributes } = this.props;
		const { numberOfPosts, postCategories } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Post Settings', 'cp-blocks')}
					>
						<SelectControl 
							multiple
							label={__('Categories', 'cp-blocks')}
							onChange={ this.onChangeCategories }
							options={categories && categories.map(category=>({value: category.id,label: category.name}))}
							value ={ postCategories && postCategories.split(',')}
						/>
						<RangeControl
							label={__('Number of Posts', 'cp-blocks')}
							value= { numberOfPosts }
							onChange={ this.onChangeNumberOfPosts }
							min={1}
							max={10}
						>
							
						</RangeControl>
					</PanelBody>
				</InspectorControls>
				{(posts && posts.length > 0 ) ?
					<ul className={className}>
						{posts.map(post=> (
							<li key={post.id}>
								<a target="_blank" rel="noopener noreferrer" href={post.link}>{decodeEntities(post.title.rendered)} </a>
							</li>
						))}
					</ul>
					: <div>{ posts ? __('No Posts Found', 'cp-blocks') : __('Loading', 'cp-blocks') } 
					</div>
				}
			</>
			
		)
	}
}


export default withSelect(
	(select,props)=>{
		const { attributes } = props;
		const { numberOfPosts, postCategories } = attributes;
		let query = { per_page: numberOfPosts };
		if(postCategories) {
			query['categories']=postCategories
		}
		
		return {
			posts: select('core').getEntityRecords('postType','post', query ),
			categories: select('core').getEntityRecords('taxonomy','category',{per_page: -1})
		}
	}
)(LatestPostsEdit);