import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="👟" />;
const ColumnIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="▶️" />;
const NewsletterIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="💌" />;

export default {
	name: 'footer',
	title: 'Footer',
	icon: Icon,
	type: 'document',
	groups: [
		{
			default: true,
			title: 'General',
			name: 'general'
		},
		{
			name: 'newsletter',
			title: 'Newsletter'
		}
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'general',
			description: 'Only used internally in the CMS',
			validation: Rule => Rule.required(),
		},
		{
			name: 'tagline',
			title: 'Tagline',
			type: 'string',
			group: 'general',
			validation: Rule => Rule.required(),
		},
		{
			name: 'menu',
			title: 'Menu',
			group: 'general',
			type: 'array',
			validation: Rule => Rule.required(),
			of: [
				{
					name: 'menu',
					title: 'Menu',
					type: 'object',
					icon: ColumnIcon,
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							name: 'links',
							title: 'Links',
							type: 'ctaList',
							description:
								'Links will stack in 2 columns, left to right.',
						},
						// {
						// 	name: 'rows',
						// 	title: 'Rows',
						// 	type: 'array',
						// 	description: 'Use these for title/link rows',
						// 	of: [
						// 		{
						// 			name: 'row',
						// 			title: 'Row',
						// 			type: 'object',
						// 			icon: ColumnIcon,
						// 			fields: [
						// 				{
						// 					name: 'title',
						// 					title: 'Title',
						// 					type: 'string',
						// 					validation: Rule => Rule.required(),
						// 				},
						// 				{
						// 					name: 'cta',
						// 					title: 'CTA',
						// 					type: 'cta',
						// 					validation: Rule => Rule.required(),
						// 				},
						// 			],
						// 			preview: {
						// 				select: {
						// 					title: 'title',
						// 				},
						// 				prepare: selection => ({
						// 					...selection,
						// 					media: <ColumnIcon />,
						// 				}),
						// 			},
						// 		},
						// 	],
						// },
					],
					preview: {
						select: {
							title: 'title',
						},
						prepare: selection => ({
							...selection,
							media: <ColumnIcon />,
						}),
					},
				},
			],
		},
		{
			name: 'newsletterSignup',
			title: 'Newsletter Signup',
			type: 'object',
			group: 'newsletter',
			icon: NewsletterIcon,
			fields: [
				{
					name: 'title',
					title: 'Title',
					type: 'string',
					validation: Rule => Rule.required(),
				},
				{
					name: 'inputPlaceholder',
					title: 'Input Placeholder',
					type: 'string',
					validation: Rule => Rule.required(),
				},
				{
					name: 'successMessage',
					title: 'Success Message',
					type: 'string',
					validation: Rule => Rule.required(),
				},
				{
					name: 'klaviyoListId',
					title: 'Klaviyo List ID',
					type: 'string',
					validation: Rule => Rule.required(),
				},
				{
					name: 'klaviyoSourceId',
					title: 'Klaviyo Source ID',
					type: 'string',
					validation: Rule => Rule.required(),
				},
			],
			preview: {
				select: {
					title: 'title',
				},
				prepare: selection => ({
					...selection,
					media: <NewsletterIcon />,
				}),
			},
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
