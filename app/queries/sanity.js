import groq from 'groq'

const richText = groq`
  ...,
  markDefs[] {
    ...,
	  (_type == 'annotationLinkInternal') => {
      _key,
      _type,
      title,
      type,
      ...reference-> {
        "documentType": _type,
        (_type == "marketingPage") => {
          "slug": "/pages/learn/" + slug.current,
          // "sanitySlug": "/collections/" + slug.current,
        },
        (_type == "home") => {
          "slug": "/",
        },
        (_type == "page") => {
          "slug": "/pages/" + slug.current,
        },
        (_type == "product") => {
          "slug": "/products/" + store.slug.current,
        },
      }
	  }
  }
`

export const QUERY_THEME = groq`
  *[_type == 'settings'][0] {
    footer {
      links[] {
        _key,
        title,
        'link': reference->{
          'productSlug': store.slug.current,
          'slug': slug.current,
          _type
        },
      }
    },
    menu {
      links[] {
        _type,
        _key,
        title,
        'link': reference->{
          'productSlug': store.slug.current,
          'slug': slug.current,
          _type
        },
      }
    },
    seo,
    theme[]-> {
      'color': core.hex,
      'colorRGB': core.rgb,
      'accent': accent.hex,
      title,
      _id,
      image
    },
  }
`

const MODULE_STANDARD_TEXT = groq`
  (_type == 'module.standardText') => {
    'bgColor': bgColor.hex,
    'bgRGB': bgColor.rgb,
    textAlign,
    text[] {
      ${richText}
    }
  }
`



const MODULES = groq`
  _type,
  _key,
  ${MODULE_STANDARD_TEXT},
`

const PAGE_MODULES = groq`
  _type,
  _key,
  ${MODULE_STANDARD_TEXT},
`

const pageQuery = groq`
  _type,
  'slug': slug.current,
  title,
  'modules': pageComponentList[] {
    ${PAGE_MODULES}
  }
`

const productQuery = groq`
  _type,
  'slug': store.slug.current,
  title,
  images,
  modules[] {
    ${MODULES}
  }
`

export const QUERY_INDEX = groq`
  *[_type == 'settings'][0] {
    homepage-> {
      ${pageQuery}
    },
    seo
}`

export const QUERY_PRODUCT = (slug) => groq`*[
  _type == 'product' && 
  store.slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
  ][0] {
    ${productQuery}
  }
`

export const QUERY_PAGE = (slug) => groq`*[
  _type == 'page' &&
  slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
  ${pageQuery}
}`