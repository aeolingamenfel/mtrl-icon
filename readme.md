# mtrl-icon Custom Element

[![npm version](https://badge.fury.io/js/mtrl-icon.svg)](https://badge.fury.io/js/mtrl-icon)

**Material Icons Version:** v31

Vanilla custom element that displays
[Google Material icons](https://material.io/icons/) in your page.

---

  - [Installation](#installation)
  - [Usage](#usage)
  - [Known Issues, Potential Gotchas](#known-issues-potential-gotchas)
  - [Legal](#legal)

## Installation

To install, run:

```
npm i mtrl-icon
```

Then, either import the file directly with:

```HTML
<script src="path/to/node_modules/mtrl-icon/src/mtrl-icon.js" defer></script>
```

or, include it in your webpack (or similar) build:

```Javascript
import "mtrl-icon";
```

## Usage

Once installed, simply use with:

```HTML
<mtrl-icon name="done"></mtrl-icon>
```

Where the `name` attribute is any valid Material icon name. See
[here](https://material.io/icons/) for a list of icons.

## Known Issues, Potential Gotchas

  - The Material icon font face is loaded from the Google Fonts CDN. It is currently not possible to load a local instance of the Material set. Please [open an issue](https://github.com/aeolingamenfel/fa-icon/issues) if you need this feature.
  - Due to a potential bug, the `@font-face` for Material Icons is elevated to the global CSS scope. See [this article by Rob Dodson](http://robdodson.me/at-font-face-doesnt-work-in-shadow-dom/) for more information.

## Legal

Material Icons by Google - ([License Information](http://google.github.io/material-design-icons/))


