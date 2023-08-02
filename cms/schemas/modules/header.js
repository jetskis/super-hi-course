import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🧢" />;
const LinkIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🔗" />;
const DrawerIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="▶️" />;
const CartIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🛒" />;
const ShopIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="⭐️" />;

export default {
	name: 'header',
	title: 'Header',
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
		{
			name: 'mobileMenu',
			title: 'Mobile Menu',
			type: 'ctaList',
			validation: Rule => Rule.required(),
		},
		{
			name: 'desktopMenu',
			title: 'Desktop Menu',
			type: 'array',
			of: [
				{
					name: 'shopMenuTrigger',
					title: 'Shop Menu Trigger',
					type: 'object',
					icon: ShopIcon,
					fields: [
						{
							name: 'title',
							title: 'Title',
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
							media: <ShopIcon />,
						}),
					},
				},
				{
					name: 'cartMenuTrigger',
					title: 'Cart Menu Trigger',
					type: 'object',
					icon: CartIcon,
					fields: [
						{
							name: 'title',
							title: 'Title',
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
							media: <CartIcon />,
						}),
					},
				},
				{
					name: 'linkMenu',
					title: 'Link',
					type: 'object',
					icon: LinkIcon,
					fields: [
						{
							name: 'cta',
							title: 'CTA',
							type: 'cta',
							validation: Rule => Rule.required(),
						},
					],
					preview: {
						select: {
							title: 'cta.0.title',
							collectionTitle: 'cta.0.collection.title',
							productTitle: 'cta.0.product.title',
							pageTitle: 'cta.0.page.title',
						},
						prepare: ({
							title,
							pageTitle,
							productTitle,
							collectionTitle,
						}) => ({
							title:
								title ||
								pageTitle ||
								productTitle ||
								collectionTitle,
							media: <LinkIcon />,
						}),
					},
				},
			],
			validation: Rule => Rule.required(),
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
