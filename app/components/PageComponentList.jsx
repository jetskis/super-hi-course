import React from 'react';
import reduce from 'lodash/reduce'

import { Hero } from '~/components/sharable/hero'
import { ValueProps } from '~/components/sharable/valueProps'
import { Faqs } from '~/components/sharable/faqs'
import { ProductGrid } from '~/components/sharable/productGrid'

const COMPONENTS = {
	'module.hero': Hero,
	'module.valueProps': ValueProps,
	'module.faqs': Faqs,
	'module.productGrid': ProductGrid
};

const unfurlGlobalComponents = (components = []) => {
	return reduce(
		components,
		(componentsWithGlobalsUnfurled, component) => {
			if (component._type === 'module.reusableModule') {
				const globalComponents = component.module.modules || []
				return [...componentsWithGlobalsUnfurled, ...globalComponents]
			} else {
				return [...componentsWithGlobalsUnfurled, component]
			}
		},
		[],
	)
}

const PageComponentList = ({components = [], componentProps = {}}) => {
	const allComponents = unfurlGlobalComponents(components)
	const componentRows = allComponents?.map((component, index) => {
		const Component = COMPONENTS[component._type];

		if (!Component)
			return (
				<div key={component._key} className="p-8">
					<div className='p-2 border border-solid bg-magenta'>
						missing - {component._type}
					</div>
				</div>
			);

		return (
			<Component
				index={index}
				key={component._key}
				{...component}
				{...componentProps}
			/>
		);
	});

	return <>{componentRows}</>
};

export default PageComponentList;
