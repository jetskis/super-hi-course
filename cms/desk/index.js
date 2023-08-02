import React from 'react'
/**
 * Desk structure overrides
 */
import {DocumentIcon, DocumentsIcon, ThLargeIcon, ComponentIcon, TrolleyIcon} from '@sanity/icons'

import settings from './settingStructure'

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'collection',
    'home',
    'media.tag',
    'page',
    'product',
    'productVariant',
		'header',
		'colorType',
		'theme',
		'footer',
		'cart',
    'settings',
  ].includes(id)
}

export const structure = (S, context) => {
  const pageMenuItem = S.listItem()
		.title('Pages')
		.schemaType('page')
		.icon(DocumentIcon)
		.child(
			S.documentTypeList('page')
				.title('Pages')
				.child(documentId =>
					S.document()
						.documentId(documentId)
						.schemaType('page')
				),
		);

	const homePageMenuItem = S.listItem()
		.title('Home Pages')
		.schemaType('home')
		.child(
			S.documentTypeList('home')
				.title('Home Pages')
				.child(documentId =>
					S.document()
						.documentId(documentId)
						.schemaType('information')
				),
		);

	const allPageMenuItem = S.listItem()
		.title('Pages')
		.icon(DocumentsIcon)
		.child(
			S.list()
				.title('Pages')
				.items([
					pageMenuItem,
					homePageMenuItem,
				]),
		);
	
	const modules = S.listItem()
		.title('Site')
		.icon(ComponentIcon)
		.child(
			S.list()
				.title('Site')
				.items([
					S.listItem()
						.title('Headers')
						.schemaType('header')
						.child(S.documentTypeList('header').title('Headers')),
					S.listItem()
						.title('Footers')
						.schemaType('footer')
						.child(S.documentTypeList('footer').title('Footers')),
					S.listItem()
						.title('Carts')
						.schemaType('cart')
						.child(S.documentTypeList('cart').title('Carts')),
					S.listItem()
						.title('Theme')
						.schemaType('theme')
						.child(S.documentTypeList('theme').title('Themes'))
				]),
		);
	
	const collections = S.listItem()
		.title('Collections')
		.icon(ThLargeIcon)
		.child(
			S.list()
				.title('Collections')
				.items([
					S.listItem()
						.title('Collections')
						.schemaType('collection')
						.child(S.documentTypeList('collection').title('Collections')),
				]),
		);


	//
	// === Products ===
	//

	const variantsByProduct = S.listItem()
		.title('By Product')
		.icon()
		.child(
			S.documentList()
				.title('Products')
				.menuItems(S.documentTypeList('product').getMenuItems())
				.filter('_type == $type && !defined(parents)')
				.params({type: 'product'})
				.child(productId =>
					S.documentList()
						.title('Variants')
						.menuItems(
							S.documentTypeList('productVariant').getMenuItems(),
						)
						.filter('_type == $type && productId == $productId')
						.params({
							type: 'productVariant',
							productId: Number(productId),
						}),
				),
		);

	const orphanedVariants = S.listItem()
		.title('Orphaned')
		.icon()
		.child(
			S.documentList()
				.title('Variants')
				.menuItems(S.documentTypeList('productVariant').getMenuItems())
				.filter(
					'_type == $type && count(*[ _type == "product" && references(^._id)]) == 0 && !(_id in path("drafts.**"))',
				)
				.params({type: 'productVariant'}),
		);

	const allShopifyVariants = S.listItem()
		.title('All Variants')
		.icon()
		.child(
			S.documentList()
				.title('Variants')
				.menuItems(S.documentTypeList('productVariant').getMenuItems())
				.filter('_type == $type')
				.params({type: 'productVariant'}),
		);

	const variantsMenuItem = S.listItem()
		.title('Product Variants')
		.icon()
		.child(
			S.list()
				.title('Product Variants')
				.items([
					variantsByProduct,
					orphanedVariants,
					allShopifyVariants,
				]),
		);


	const colorTypeMenuItems = S.listItem()
		.title('Colors')
		.icon()
		.child(
			S.documentList()
				.title('Colors')
				.menuItems(S.documentTypeList('colorType').getMenuItems())
				.filter('_type == $type')
				.params({type: 'colorType'}),
		);

	const productsMenuItem = S.listItem()
		.title('Shopify Products')
		.icon()
		.child(
			S.documentList()
				.title('Shopify Products')
				.menuItems(S.documentTypeList('product').getMenuItems())
				.filter('_type == $type')
				.params({type: 'product'}),
		);

	const productMenuItem = S.listItem()
		.title('Products')
		.icon(TrolleyIcon)
		.child(
			S.list()
				.title('Products')
				.items([
					S.divider(),
					productsMenuItem,
					variantsMenuItem,
					S.divider(),
					colorTypeMenuItems,
				]),
		);

  return S.list()
    .title('Content')
    .items([
			allPageMenuItem,
      S.divider(),
      collections,
			productMenuItem,
      S.divider(),
			modules,
      settings(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
  }