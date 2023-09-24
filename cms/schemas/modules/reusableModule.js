import React from 'react';
import Emoji from 'a11y-react-emoji';

import { defineField } from 'sanity'

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="♻️" />;

export default {
	name: 'reusableModule',
	title: 'Reusable Module',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Only used internally in the CMS',
			validation: Rule => Rule.required(),
		},
    defineField({
      name: 'reusableComponentList',
      title: 'Modules',
      type: 'reusableComponentList',
    }),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: selection => ({
			...selection,
			media: <Icon />,
		}),
	},
};
