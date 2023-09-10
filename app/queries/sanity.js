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

const MODULE_HERO = groq`
  (_type == 'module.hero') => {
    'bgColor': bgColor.hex,
    'image': image.asset-> {
      metadata,
      url
    },
    text[] {
      ${richText}
    }
  }
`

const MODULE_IMAGE = groq`
  (_type == 'module.image') => {
    'image': image.asset-> {
      metadata,
      url
    }
  }
`

const MODULE_VALUE_PROPS = groq`
  (_type == 'module.valueProps') => {
    'bgColor': bgColor.hex,
    values[] {
      _key,
      text[] {
        ${richText}
      }
    }
  }
`

const MODULE_BIG_BENEFITS = groq`
  (_type == 'module.bigBenefits') => {
    'bgColor': bgColor.hex,
    values[]
  }
`

const MODULE_PRODUCT_GRID = groq`
  (_type == 'module.productGrid') => {
    'bgColor': bgColor.hex,
    products[] {
      _key,
      _type,
      'product': product-> {
        store,
      },
      'productVariant': productVariant-> {
        store,
      }
    }
  }
`

const MODULE_FAQS = groq`
  (_type == 'module.faqs') => {
    'bgColor': bgColor.hex,
    title,
    faqList[]-> {
      question,
      answer[] {
        ${richText}
      },
      _id
    }
  }
`

const MODULES = groq`
  _type,
  _key,
  ${MODULE_STANDARD_TEXT},
  ${MODULE_HERO}
`
const PRODUCT_MODULES = groq`
  _type,
  _key,
  ${MODULE_STANDARD_TEXT},
  ${MODULE_VALUE_PROPS},
  ${MODULE_FAQS},
  ${MODULE_IMAGE},
  ${MODULE_BIG_BENEFITS}
`

const PAGE_MODULES = groq`
  _type,
  _key,
  ${MODULE_STANDARD_TEXT},
  ${MODULE_HERO},
  ${MODULE_PRODUCT_GRID},
  ${MODULE_VALUE_PROPS},
  ${MODULE_FAQS}
`

const pageQuery = groq`
  _type,
  'slug': slug.current,
  title,
  'modules': pageComponentList[] {
    ${PAGE_MODULES}
  }
`

const homeQuery = groq`
  'modules': modules[] {
    ${PAGE_MODULES}
  }
`

const productQuery = groq`
  _type,
  'slug': store.slug.current,
  title,
  images,
  body[] {
    ${richText}
  },
  modules[] {
    ${PRODUCT_MODULES}
  },
  associatedProducts[]-> {
    _id,
    store {
      title,
      'slug': slug.current
    }
  },
  store {
    ...,
    variants[]-> {
      ...,
      'mainImage': mainImage.asset-> {
        url,
        _id,
      },
      'pattern': pattern-> {
        _type,
        _key,
        ...,
        'colorType': colorType[0] {
          _type,
          _key,
          _type == 'color' => {
            'color': hex,
          },
          _type == 'module.image' => {
            'image': image.asset-> {
              ...
            }
          }
        }
        
      }
    }
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

export const QUERY_HOME = groq`
  *[_type == 'home' &&
  !(_id in path("drafts.**"))] {
    ${homeQuery}
  }[0]
`

