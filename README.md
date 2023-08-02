# Superhi - Modular Commerce

This is a mono-repo-like experience, you will find the core of hydrogen running in the root directory, you will also find a `sanity` instance running inside of the `cms` directory powered by `next.js`. 

### Hydrogen:

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher

*Remember to update `.env` with your shop's domain and Storefront API token!

```bash
yarn or npm install
```

## CMS 

This is tricker given the way the Sanity CLI is configured, the easiest method is to generate a new Sanity instance which you can do following this [guide](https://www.sanity.io/docs/installation) and I will explain in a lesson to make it easier.

Once you have the SANITY-CLI installed you can simply navigate to the `cms` directory and run `sanity init --env .env.local` in the terminal.

You will be asked a series of questions, create a new project, name the project and assign it to your personal sanity or your personal sanity or, from there you can follow the prompts as follows:

```bash
? Use the default dataset configuration? Yes
✔ Creating dataset
? Would you like to add configuration files for a Sanity project in this Next.js folder? Yes
? Do you want to use TypeScript? No
? Would you like an embedded Sanity Studio? No
? File /sanity.cli.js already exists. Do you want to overwrite it? No
? Select project template to use Clean project with no predefined schemas
? File /sanity/schema.js already exists. Do you want to overwrite it? No
? File /sanity/env.js already exists. Do you want to overwrite it? No
? File /sanity/lib/client.js already exists. Do you want to overwrite it? No
? File /sanity/lib/image.js already exists. Do you want to overwrite it? No
? Would you like to add the project ID and dataset to your .env.local file? Yes
```

^^ Mostly override/create the `env.local`` is all you need to do 

Once you init a new sanity instance, you can simply take the generate sanity ID and place it in a duplicated `.sample.env` file that you should save as `.env` and not commit to your repo! We will be deploying the cms to vercel and putting our environment variable there as well so the sanity instance is hosted.


### FAQs

<details>
  <summary>Why is Sanity in Next.js?</summary>
  Sanity is a unique CMS platform that can be embedded anywhere, that means we don't have to host the studio on sanity itself. We can instead host it on any platform we want (in this case vercel). We do this because it gives our sanity extra powers out of the box, we can now utilize next.js as well as `api` routes for handling complex api interactions without our studio, we won't go into explicit details around everything you can do with the additional power of next.js but I want you to have the best tool set to do more with modular commerce. I'll be linking a tutorial to how I upload files directly to Shopify in my Sanity studio and it's only possible with next.js and vercel hosted solutions. We can also give our CMS a custom domain like cms.website.com that makes it easier for the client or you to access it on the web. 
</details>
