import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="👯‍♀️" />;

export default {
	name: 'collectionLink',
	title: 'Collection Link',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'collection',
			title: 'Collection',
			type: 'reference',
			to: [{type: 'collection'}],
			validation: Rule => Rule.required(),
		},
		{
			name: 'title',
			title: 'Title',
			description:
				'This is optional. It will default to the collection title.',
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
			collectionTitle: 'collection.title',
		},
		prepare: ({title, collectionTitle}) => ({
			title: title || collectionTitle,
			media: <Icon />,
		}),
	},
};
