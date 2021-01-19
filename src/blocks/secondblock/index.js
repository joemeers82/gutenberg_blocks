import "./styles.editor.scss";

import { registerBlockType, createBlock } from "@wordpress/blocks";

import { __ } from "@wordpress/i18n";

import { RichText, getColorClassName } from "@wordpress/block-editor";

import Edit from './edit';

import classnames from 'classnames';
import { omit } from 'lodash';

// import { PanelBody } from "@wordpress/components"

const attributes = {
    content: {
        type: 'string',
        source: 'html',
        selector: 'h4'
    },
    alignment: {
        type: 'string'
    },
    textAlignment: {
        type: 'string'
    },
    backgroundColor: {
        type: 'string'
    },
    textColor: {
        type: 'string'
    },
    customBackgroundcolor: {
        type: 'string',
    },
    customTextColor: {
        type: 'string',
    },
    shadow: {
        type: 'boolean',
        default: false
    },
    shadowOpacity: {
        type: 'number',
        default: 0.3
    }
}


registerBlockType("cp-blocks/secondblock", {
    title: __("Second Block", "cp-blocks"),
    description: __("Our first block", "cp-blocks"),
    category: "cp_blocks-category",
    icon: (
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><g><path d="M17,1H7C5.9,1,5,1.9,5,3v18c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V3C19,1.9,18.1,1,17,1z M7,18V6h10v12H7z M16,11V9.14 C16,8.51,15.55,8,15,8H9C8.45,8,8,8.51,8,9.14l0,1.96c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1l0,1.76C8,15.49,8.45,16,9,16h6 c0.55,0,1-0.51,1-1.14V13c-0.55,0-1-0.45-1-1C15,11.45,15.45,11,16,11z M12.5,14.5h-1v-1h1V14.5z M12.5,12.5h-1v-1h1V12.5z M12.5,10.5h-1v-1h1V10.5z"/></g></svg>
    ),
    keywords: [__("photo", "cp-blocks"), __("hero", "cp-blocks")],
    styles: [
        {
            name: 'rounded',
            label: __('Rounded', 'cp-blocks'),
            isDefault: true
        },
        {
            name: 'outline',
            label: __('Outline', 'cp-blocks')
        },
        {
            name: 'squared',
            label: __('Squared', 'cp-blocks')
        }

    ],

    attributes,
    deprecated: [
        {
            attributes: omit({
                ...attributes,
                },['textAlignment']),
                migrate: (attributes)=>{
                    return omit({
                        ...attributes,
                        textAlignment: attributes.alignment
                    },['alignment'])
                },

                save: ({ attributes })=> {
                    const { content, alignment, backgroundColor, textColor, 
                            customBackgroundcolor, customTextColor, shadow, shadowOpacity  
                        } = attributes;
                    const backgroundClass = getColorClassName('background-color',backgroundColor );
                    const textClass = getColorClassName('color', textColor ); 
                    

                    const classes = classnames({
                        [backgroundClass]: backgroundClass,
                        [textClass]: textClass,
                        'has-shadow' : shadow,
                        [`shadow-opacity-${shadowOpacity * 100}`] : shadowOpacity
                    }) 
                 
                    return <RichText.Content
                        tagName="p"
                        className = { classes }
                        value = { content }

                        style= {{ 
                            textAlign: alignment, 
                            backgroundColor: backgroundColor ? undefined : customBackgroundcolor, 
                            color: textColor ? undefined : customTextColor
                        }}
                    />
                }, 
        },

        {
            // supports
            attributes: omit({
                ...attributes,
                content:{
                    type: 'string',
                    source: 'html',
                    selector: 'p'
                },
            },['textAlignment']),
            migrate: (attributes)=>{
                return omit({
                    ...attributes,
                    textAlignment: attributes.alignment
                },['alignment'])
            },
            save: ({ attributes })=> {
                const { content, alignment, backgroundColor, textColor, 
                        customBackgroundcolor, customTextColor, shadow, shadowOpacity  
                    } = attributes;
                const backgroundClass = getColorClassName('background-color',backgroundColor );
                const textClass = getColorClassName('color', textColor ); 
                

                const classes = classnames({
                    [backgroundClass]: backgroundClass,
                    [textClass]: textClass,
                    'has-shadow' : shadow,
                    [`shadow-opacity-${shadowOpacity * 100}`] : shadowOpacity
                }) 
             
                return <RichText.Content
                    tagName="p"
                    className = { classes }
                    value = { content }

                    style= {{ 
                        textAlign: alignment, 
                        backgroundColor: backgroundColor ? undefined : customBackgroundcolor, 
                        color: textColor ? undefined : customTextColor
                    }}
                />
            },
        }
    ],
    transforms: {
        from: [
            {
                type: 'block',
                blocks: ['core/paragraph'],
                transform: ( { content, align } )=>{
                    return createBlock('cp-blocks/secondblock',{
                        content: content, 
                        textAlignment: align
                    })
                }
            },
            {
                type: 'prefix',
                prefix: '#',
                transform: ()=>{
                    return createBlock('cp-blocks/secondblock')
                }
            }
        ],
        to: [
            {
                type: 'block',
                blocks: ['core/paragraph'],
                isMatch: ( {content } ) =>{
                    if(content) return true;
                    return false
                },
                transform: ( {content, textAlignment })=>{
                    return createBlock('core/paragraph', {
                        content: content,
                        align: textAlignment
                    })
                }
            }
        ]
    },  
    edit: Edit,
    save: ({ attributes })=> {
        const { content, textAlignment, backgroundColor, textColor, 
                customBackgroundcolor, customTextColor, shadow, shadowOpacity  
            } = attributes;
        const backgroundClass = getColorClassName('background-color',backgroundColor );
        const textClass = getColorClassName('color', textColor ); 
        

        const classes = classnames({
            [backgroundClass]: backgroundClass,
            [textClass]: textClass,
            'has-shadow' : shadow,
            [`shadow-opacity-${shadowOpacity * 100}`] : shadowOpacity
        }) 
     
        return <RichText.Content
            tagName="h4"
            className = { classes }
            value = { content }

            style= {{ 
                textAlign: textAlignment, 
                backgroundColor: backgroundColor ? undefined : customBackgroundcolor, 
                color: textColor ? undefined : customTextColor
            }}
        />
    }
});
