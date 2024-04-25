import { useState } from "react";
import { createRoot } from 'react-dom/client';
import {
  BlockEditorProvider,
  BlockCanvas,
} from "@wordpress/block-editor";
import { registerCoreBlocks } from "@wordpress/block-library";
import { serialize, parse } from '@wordpress/blocks';

import { useStateWithHistory } from '@wordpress/compose';

// Default styles that are needed for the editor.
import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";

// Default styles that are needed for the core blocks.
import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/editor.css";

// Import and register formats.
import '@wordpress/format-library';
import '@wordpress/format-library/build-style/style.css';

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

const blocksInitialState = parse(htmlContent);

function Editor() {
  const { value, setValue, hasUndo, hasRedo, undo, redo } = useStateWithHistory({ blocks: blocksInitialState });

  console.log(value.blocks);

  return (
    /*
        The BlockEditorProvider is the wrapper of the block editor's state.
        All the UI elements of the block editor need to be rendered within this provider.
      */
    <BlockEditorProvider
      value={value.blocks}
      selection={value.selection}
      onChange={(blocks, { selection }) =>
        setValue({ blocks, selection }, false)
      }
      onInput={(blocks, { selection }) =>
        setValue({ blocks, selection }, true)
      }
    >
      <div className="undo-redo-toolbar">
        <button onClick={undo} disabled={!hasUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!hasRedo}>
          Redo
        </button>
      </div>
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