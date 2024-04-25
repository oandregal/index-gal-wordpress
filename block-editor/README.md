# Block Editor Example

## What is it?

This example aims to demo the [@wordpress/block-editor](https://www.npmjs.com/package/@wordpress/block-editor) and [@wordpress/block-library](https://www.npmjs.com/package/@wordpress/block-library) packages.

With these two packages you can build your own block-based editor, tailored to your needs.

## Demo

```sh
npm install
npm run dev
```

Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

There's a couple of extra examples as branches that you can checkout:

- 1-html-block: how to convert HTML <=> block format.
- 2-raw-html: how to provide fallbacks to raw HTML (it's not marked with block delimiters).
- 3-richtext-formats: how to provide formats to the blocks (bold, emphasis, etc.).
- 4-undo-redo: how to add undo/redo capabilities.

## Coda

This demo was bootstrapped using React and Vite, following the [Gutenberg Block Editor](https://wordpress.org/gutenberg-framework/) documentation.
