import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './style.scss';
import Edit from './edit';

registerBlockType( 'vfh-blocks/vfh-latest-posts', {
	title: __( 'VFH Latest Posts', 'vfh-blocks' ),
	description: __(
		'Widget with latest posts',
		'vfh-blocks'
	),
	category: 'widgets',
	icon: 'screenoptions',
	supports: {
		html: false,
		align: ['center', 'wide', 'full']
	},
	edit: Edit,
});
