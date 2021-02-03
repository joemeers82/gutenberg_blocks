import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { withSelect } from "@wordpress/data";

let TodoCount = (props) =>{
	return (
		<div>
			<p>Total: {props.total}</p>
			<p>Todo: {props.todo}</p>
			<p>Done: {props.done}</p>
		</div>
	)
}

TodoCount = withSelect(
	(select) => {
		return {
			total: select('cp-blocks/todo').getToDosNumber(),
			todo: select('cp-blocks/todo').getUnDoneTodosNumber(),
			done: select('cp-blocks/todo').getDoneTodosNumber(),
		}
	}
)(TodoCount);

registerBlockType('cp-blocks/todo-list-count', {
	title: __('Redux Todo Count', 'cp-blocks'),
	
	description: __('A todo list', 'cp-blocks'),
	
	icon: 'editor-ul',
	
	category: 'cp_blocks-category',
	
	edit() {
		return <TodoCount></TodoCount>
	},
	save() {
		return null;
	},
});