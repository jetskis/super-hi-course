import React, { useState } from 'react';
import {defaultSerializers} from '@sanity/block-content-to-react';
import cx from 'classnames'
import BlockContent from '@sanity/block-content-to-react'
import { Link, useFetchers, Await, useMatches } from '@remix-run/react'
// import MarkLink from '@components/markLink';
// import Link from '@components/link'
// import BlockTable from '../components/BlockTable';
// import BlockImage from '@components/blockImage';

const PlusIcon = ({ className }) => (
	<svg className={cx('transform duration-200 ml-2', className)} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0 5H10" stroke="#2C383F"/>
		<path d="M5 0L5 10" stroke="#2C383F"/>
	</svg>
)

import { ShopifyPhoto } from '~/components/ShopifyPhoto'

const Image = props => {
	return (
		<div>
			<ShopifyPhoto {...props.node} className='w-full h-auto' />
		</div>
	)
}

const InternalLink = props => {
	return (
		<>
			<Link to={props.mark.slug} className='theme-add-button hover:no-underline p-2 px-4 my-4 inline-block rounded-[20px]'>
				<span>
					{props.children}
				</span>
			</Link>
		</>
	)
}

const BlockRender = props => {
	const {style = 'normal'} = props.node;
	if (style === 'h1') {
		return <h1 className='text-mono-82 font-mono py-1 my-2 800:my-4'>{props.children}</h1>;
	} else if (style === 'h2') {
		return <h2 className='text-mono-64 font-mono py-1 my-2 800:my-4'>{props.children}</h2>;
	} else if (style === 'h2-serif') {
		return <h2 className='text-serif-42 font-serif py-1 my-2 800:my-4'>{props.children}</h2>;
	} else if (style === 'h3') {
		return <h3 className='text-mono-36 font-mono'>{props.children}</h3>;
	} else if (style === 'h4') {
		return <h4 className='text-mono-18 mb-3 font-mono'>{props.children}</h4>;
	} else if (style === 'h5') {
		return <h5 className='text-mono-14 uppercase my-2  font-mono'>{props.children}</h5>;
	} else if (style === 'normal') {
		return <p className="text-mono-14 my-2">{props.children}</p>;
	} else if (style === 'script') {
		return <p className="text-14 800:text-18 800:leading-24">{props.children}</p>;
	} else if (style === 'p2') {
		return <p className="text-14 leading-16 800:text-18 800:leading-24">{props.children}</p>;
	}  else if (style === 'p-caption') {
		return <p className="text-18 800:text-28 800:leading-38">{props.children}</p>;
	} else if (style === 'p3') {
		return <p className="text-12 800:text-14">{props.children}</p>;
	}

	// Fall back to default handling
	return defaultSerializers.types.block(props);
}

const SerializerMini = {
	types: {
		block: BlockRender,
	}
}

const Serializer = {
	types: {
		block: BlockRender,
		// table: BlockTable,
		shopifyImage: Image
	},

	list: (props) => {
		const { type } = props;
		const bullet = type === 'bullet';
		if (bullet) {
			return <ul className='ml-4 my-4'>{props.children}</ul>;
		}
		return <ol>{props.children}</ol>;
	},
	listItem: (props) => <li className='list-disc pl-2'>{props.children}</li>,
	marks: {
    strong: ({children}) => <strong className="font-bold uppercase text-15">{children}</strong>,
    em: ({children}) => <em className="font-sans">{children}</em>,
		// link: MarkLink,
		annotationLinkInternal: InternalLink
	},

};


export default Serializer

