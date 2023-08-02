import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🔗" />;

export default {
	name: 'link',
	title: 'Link',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: Rule =>
				Rule.required().uri({
					allowRelative: true,
					scheme: ['http', 'https', 'tel', 'sms', 'mailto'],
				}),
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
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
		},
		prepare: selection => ({
			...selection,
			media: <Icon />,
		}),
	},
};
