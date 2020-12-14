const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType("cp-blocks/firstblock", {
    title: __("First Block", "cp-blocks"),
    description: __("Our first block", "cp-blocks"),
    category: "layout",
    icon: {
        src: "admin-network"
    },
    keywords: [__("photo", "cp-blocks"), __("hero", "cp-blocks")],
    edit: function () {
        return <p>Editor</p>;
    },
    save: function () {
        return <p>Saved Content</p>;
    }
});
