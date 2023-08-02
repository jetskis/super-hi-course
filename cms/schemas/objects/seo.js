import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🔍" />;

export default {
	name: 'seo',
	title: 'SEO',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'initSeo',
			type: 'boolean',
			title: 'Inits the SEO object',
			hidden: true,
			initialValue: true,
		},

		//
		// === Search ===
		//

		{
			name: 'hideFromSitemap',
			type: 'boolean',
			title: 'Hide page in sitemap',
			description: 'For search engines. Will be added to /sitemap.xml',
		},
		{
			name: 'disallowRobots',
			type: 'boolean',
			title: 'Disallow in robots.txt',
			description: 'Hide this route for search engines',
		},

		//
		// === Meta ===
		//
		{
			name: 'metaTitle',
			title: 'Meta Title',
			type: 'string',
		},
		{
			name: 'metaDescription',
			title: 'Meta Description',
			type: 'text',
			rows: 2,
		},
		{
			name: 'metaKeywords',
			title: 'Meta Keywords',
			type: 'string',
		},

		//
		// === Opengraph ===
		//
		{
			name: 'openGraphTitle',
			title: 'OpenGraph Title',
			type: 'string',
		},
		{
			name: 'openGraphDescription',
			title: 'OpenGraph Description',
			type: 'text',
			rows: 2,
		},
		{
			name: 'openGraphImage',
			title: 'OpenGraph Image',
			type: 'image',
			description: 'Recommended size is 1200x630. No larger than 1mb.',
		},

		{
			name: 'twitterTitle',
			title: 'Twitter Title',
			type: 'string',
		},
		{
			name: 'twitterDescription',
			title: 'Twitter Description',
			type: 'text',
			rows: 2,
		},
		{
			name: 'twitterImage',
			title: 'Twitter Image',
			type: 'image',
			description: 'Recommended size is 1200x630. No larger than 1mb.',
		},
	],
};
