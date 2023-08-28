import React from 'react';

import { ValueProps } from '~/components/sharable/valueProps'
import { Faqs } from '~/components/sharable/faqs'

const COMPONENTS = {
	'module.valueProps': ValueProps,
	'module.faqs': Faqs,
};

const ProductComponentList = ({components = [], componentProps = {}}) => {
	const componentRows = components?.map((component, index) => {
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

export default ProductComponentList;
