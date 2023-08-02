import React from 'react';
import textBlock from '../../utils/textBlock';
// import tableBlock from '../utils/tableBlock';

export default {
	name: 'richText',
	title: 'Rich Text',
	// icon: Icon,
	type: 'array',
	of: [
    textBlock, 
		{
			type: 'object',
			name: 'readMore',
			title: 'Read More',
			fields: [
				{
					type: 'module.standardText',
					name: 'text',
					title: 'Text',
				},
			],
			preview: {
				select: {},
				prepare(selection)  {
					return {
						title: 'Read More',
					}
				}
			}
		}
    // tableBlock, 
    // {type: 'imageAlt'}
	],
};
