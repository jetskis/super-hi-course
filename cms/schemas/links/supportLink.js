import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="📝" />;

export default {
	name: 'supportLink',
	title: 'Support Link',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'page',
			title: 'Page',
			type: 'reference',
			to: [{type: 'information'}],
			validation: Rule => Rule.required(),
		},
		{
			name: 'title',
			title: 'Title',
			description: 'This is optional. It will default to the page title.',
			type: 'string',
		},
		{
			name: 'openInNewWindow',
			title: 'Open In New Window',
			type: 'boolean',
			layout: 'checkbox',
		},
	],
	preview: {
		select: {
			title: 'title',
			pageTitle: 'page.title',
		},
		prepare: ({title, pageTitle}) => ({
			title: title || pageTitle,
			media: <Icon />,
		}),
	},
};
