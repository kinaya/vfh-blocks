import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';

import Edit from './edit';
import save from './save';

registerBlockType( 'vfh-blocks/vfh-recommended', {
	title: __( 'VFH Recommended', 'vfh' ),
	description: __(
		'Widget with recommended posts',
		'vfh-blocks'
	),
	category: 'widgets',
	icon: 'screenoptions',
	supports: {
		html: false,
		align: ['center', 'wide', 'full']
	},
  attributes: {
		recommendedPosts: {
			type: 'array',
			default: []
		},
		alignment: {
      type: 'string',
      default: 'none'
    }
  },
	edit: Edit,
	save,
});
