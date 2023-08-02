import React, {Fragment} from 'react';
// To customize it, use it as a children component:
import {NextStudioHead} from 'next-sanity/studio/head';

export default function CustomStudioHead() {
	return (
		<Fragment>
			<NextStudioHead favicons={false} />
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-globe.png"
			/>
		</Fragment>
	);
}
