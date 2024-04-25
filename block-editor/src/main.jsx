import { useState } from "react";
import { createRoot } from 'react-dom/client';
import {
  BlockEditorProvider,
  BlockCanvas,
} from "@wordpress/block-editor";
import { registerCoreBlocks } from "@wordpress/block-library";
import { serialize, parse } from '@wordpress/blocks';

// Default styles that are needed for the editor.
import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";

// Default styles that are needed for the core blocks.
import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/editor.css";

// Register the default core block types.
registerCoreBlocks();

const htmlContent = `
<!-- wp:heading -->
<h2>Ola, index.gal</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Esto é un editor de bloques.</p>
<!-- /wp:paragraph -->
`;

// HTML => Blocks.
const blocksInitialState = parse(htmlContent);
console.log( blocksInitialState );

function Editor() {
  const [blocks, setBlocks] = useState( blocksInitialState );

  // Blocks => HTML.
  console.log( serialize( blocks ) );

  return (
    /*
        The BlockEditorProvider is the wrapper of the block editor's state.
        All the UI elements of the block editor need to be rendered within this provider.
      */
    <BlockEditorProvider
      value={blocks}
      onChange={setBlocks}
      onInput={setBlocks}
    >
      {/*
          The BlockCanvas component renders the block list within an iframe
          and wire up all the necessary events to make the block editor work.
        */}
      <BlockCanvas height="500px" />
    </BlockEditorProvider>
  );
}

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<Editor />);