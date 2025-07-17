# Webflow GSAP Starter Kit

A lightweight starter kit for building custom animations in Webflow using GSAP.

This template is based on [Finsweet's Developer Starter](https://www.finsweet.com/) and has been adjusted for personal use.

---

## Table of Contents

* [Included Tools](#included-tools)
* [Requirements](#requirements)
* [Getting Started](#getting-started)

  * [Installation](#installation)
  * [Building](#building)
  * [Serving on Development Mode](#serving-on-development-mode)
  * [Building Multiple Files](#building-multiple-files)
  * [Including CSS Files](#including-css-files)
  * [Setting Up Path Aliases](#setting-up-path-aliases)
* [Pre-defined Scripts](#pre-defined-scripts)
* [Credits](#credits)

---

## Included Tools

* [esbuild](https://esbuild.github.io/): Lightning-fast JS bundler.
* [Finsweet TypeScript Utils](https://github.com/finsweet/ts-utils): Utility functions for Webflow development (still usable in JS).

> ⚠️ Typescript, Playwright, Prettier, ESLint and Changesets have been removed for simplicity.

---

## Requirements

You must use [pnpm](https://pnpm.io/) as your package manager.

Install it globally:

```bash
npm install -g pnpm
```

---

## Getting Started

Clone the repo or create a new one based on this kit. Then:

### Installation

```bash
pnpm install
```

---

### Building

There are two main scripts:

* `pnpm dev`: Builds files and runs a local development server.
* `pnpm build`: Builds the production output to the `dist` folder.

---

### Serving on Development Mode

Run:

```bash
pnpm dev
```

This will:

* Build the project in watch mode.
* Launch a local dev server at: `http://localhost:3000`
* Automatically reload changes when files are saved.

To use in Webflow:

```html
<script defer src="http://localhost:3000/your-file.js"></script>
```

---

### Building Multiple Files

Edit the `bin/build.js` file to add new input files:

```js
const ENTRY_POINTS = [
  'src/index.js',
  'src/another-page.js'
];
```

These will be output into the `dist` folder.

---

### Including CSS Files

You can include CSS in two ways:

1. Add the CSS file directly to the `ENTRY_POINTS` array.
2. Import it inside your JS file:

```js
import './styles.css';
```

---

### Setting Up Path Aliases

You can set shortcuts for importing files using `tsconfig.json` (still works with JS).

Example:

```json
"paths": {
  "$utils/*": ["src/utils/*"]
}
```

Now you can import using:

```js
import someUtil from '$utils/my-util';
```

---

## Pre-defined Scripts

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development node ./bin/build.js",
  "build": "cross-env NODE_ENV=production node ./bin/build.js"
}
```

---

## Credits

* Original template by [Finsweet](https://www.finsweet.com/)
* Adapted and maintained by [Tarek Nageib](https://github.com/tareknageib22)

---
