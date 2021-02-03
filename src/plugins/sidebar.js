import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar, PluginSidebarMoreMenuItem, PluginPostStatusInfo, 
	PluginPrePublishPanel, PluginPostPublishPanel, PluginBlockSettingsMenuItem, PluginMoreMenuItem } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl } from "@wordpress/components";

import {withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";

let PluginMetaFields = (props)=>{
	return (
		<>
			<PanelBody
				title={__("Meta Fields Panel For The Ages", "cp-blocks") }
				icon="admin-post"
				initialOpen = {true}
			>
				<TextControl
					value={props.subtitle}
					label={__("Post Subtitle", "cp-blocks")}
					onChange={(value)=> props.onSubtitleChange(value)}
				>
					
				</TextControl>

			</PanelBody>
		</>
	)
}

PluginMetaFields = compose([
	withSelect(
		(select) => {
			return {                                                            
				subtitle: select('core/editor').getEditedPostAttribute('meta')['_cp_block_post_subtitle']
			}
		}
	),
	withDispatch(
		(dispatch) =>{
			return{
				onSubtitleChange: (subtitle)=>{             
					dispatch('core/editor').editPost({meta: {_cp_block_post_subtitle: subtitle}
				})
				}
			}
		}
	)
])(PluginMetaFields)

registerPlugin( 'cp-blocks-sidebar', {
	
	render: ()=>{
		return (
			<>
				<PluginSidebarMoreMenuItem
					target="cp-blocks-sidebar"
				>
					{__('Meta Options', 'cp-blocks')}

				</PluginSidebarMoreMenuItem>

				<PluginSidebar
					name="cp-blocks-sidebar"
					icon="admin-post"
					title={__('Meta Options', 'cp-blocks')}
				>
					<PluginMetaFields>
						

					</PluginMetaFields>

				</PluginSidebar>
				
				<PluginPostStatusInfo>
					test run
				</PluginPostStatusInfo>

				<PluginPostPublishPanel

					title="cool beans"
					initialOpen= { true}
				>
				Cool Stuff for Post Plublish
				</PluginPostPublishPanel>

				<PluginPrePublishPanel

					title="cool beans"
					initialOpen= { true}
				>
				Cool Stuff for Pre Publish
				</PluginPrePublishPanel>

				<PluginBlockSettingsMenuItem
					icon="twitter"
					label="sweet setting item"
					onClick={()=> alert(true)}
				>
					
				</PluginBlockSettingsMenuItem>

				<PluginMoreMenuItem
					icon="twitter"
				>
					sweetness

				</PluginMoreMenuItem>
			</>
		)
	}

})