import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🚧" />;

export default {
	name: 'pageComponentList',
	title: 'Components',
	icon: Icon,
	type: 'array',
	of: [
		{ type: 'module.hero' },
		{ type: 'module.valueProps' },
		{ type: 'module.faqs' },
		{ type: 'module.image' },
		{ type: 'module.productGrid' },
		{ type: 'module.standardText' },
	],
};
