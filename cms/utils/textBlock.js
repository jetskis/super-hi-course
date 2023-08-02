import React from 'react'

const P3 = props => (
	<span style={{fontSize: '13px'}}>{props.children}</span>
)

export default {
	type: 'block',
	styles: [
		{
			title: 'Normal',
			value: 'normal',
		},
		{
			title: 'Paragraph 2',
			value: 'p2',
			component: (props) => <span style={{ fontSize: '20px' }}>{props.children}</span>
		},
		{
			title: 'Mini',
			value: 'mini',
		},
		{
			title: 'Mono',
			value: 'mono',
			component: (props) => <span style={{ fontSize: '11px', fontFamily: 'monospace' }}>{props.children}</span>
		},
		{
			title: 'Heading H1',
			value: 'h1',
		},
		{
			title: 'Heading H2',
			value: 'h2',
		},
		{
			title: 'Heading H3',
			value: 'h3',
		},
		{
			title: 'Heading H4',
			value: 'h4',
		},
		{
			title: 'Heading H5',
			value: 'h5',
		},

		{
			title: 'Heading H2 Serif',
			value: 'h2-serif',
			component: (props) => <h2 style={{ fontFamily: 'serif' }}>{props.children}</h2>
		},
	],
	marks: {
		decorators: [
			{
				title: 'Strong',
				value: 'strong',
			},
			{
				title: 'Emphasis',
				value: 'em',
			},
		],
		annotations: [
			{
				name: 'link',
				type: 'object',
				title: 'Link',
				fields: [
					{
						name: 'href', // this is for blocks only
						title: 'URL',
						type: 'url',
						validation: Rule =>
							Rule.required().uri({
								allowRelative: true,
								scheme: ['http', 'https', 'tel', 'mailto'],
							}),
					},
					{
						name: 'title',
						title: 'Title',
						type: 'string',
					},
					{
						name: 'openInNewWindow',
						title: 'Open In New Window',
						type: 'boolean',
						layout: 'checkbox',
					},
				],
			},
		],
	},
};
