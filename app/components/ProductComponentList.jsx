import React from 'react';

import { ValueProps } from '~/components/sharable/valueProps'
import { BigBenefits } from '~/components/sharable/benefits'
import { Faqs } from '~/components/sharable/faqs'
import { Image } from '~/components/sharable/image'

const COMPONENTS = {
	'module.valueProps': ValueProps,
	'module.faqs': Faqs,
	'module.bigBenefits': BigBenefits,
	'module.image': Image,
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
