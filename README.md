# EnsuredImage

A React component to reload an image if it fails.

When displaying images in a web app that needs to work offline, sometimes images on the page won't load. Using this component instead of a standard `img` will do two things:

1. It will display a placeholder if the image fails to load.
2. It will try to reload the image until it loads successfully.

## Installation

Using npm:

```
npm i --save @sirbrillig/ensured-image
```

or yarn:


```
yarn add @sirbrillig/ensured-image
```

## Usage

```js
import EnsuredImage from '@sirbrillig/ensured-image'

function ImageList( { imageUrls } ) {
	// (In real life you would need a `key` prop in this situation.)
	return imageUrls.map( url => <EnsuredImage src={ url } /> )
}
```

## Advanced Usage

The `EnsuredImage` component accepts many props common to `img` components, including:

- `src` (required!)
- `className`
- `onClick`
- `onError` (will be called after the placeholder is added.)
- `alt`
- `id`
- `sizes`
- `srcSet`
- `title`

It also includes a few special props:

- `PlaceholderComponent`: A custom placeholder to use instead of the default.
- `ImageComponent`: A custom `img` component to use instead of the default.
- `setTimeout`: A custom implementation of window.setTimeout.
- `retryAfter`: A number of miliseconds to wait before reloading a failed image (default: 1 minute).

