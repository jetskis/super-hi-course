import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🛍" />;

export default {
	name: 'cart',
	title: 'Cart',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'empty', title: 'Empty Cart'},
		{name: 'gift', title: 'Gift Message'},
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Only used internally in the CMS',
			group: 'main',
			validation: Rule => Rule.required(),
		},
		{
			name: 'freeShippingCents',
			title: 'Free Shipping Threshold (cents)',
			description: 'Set to 0 to disable',
			type: 'number',
			group: 'main',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({title}) => ({
			title,
			media: <Icon />,
		}),
	},
};
