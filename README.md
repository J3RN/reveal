# Reveal

A tool to show the underlying AST stucture of your code through colored boxes.  It's like syntax highlighting, but shows the full extent of syntactic constructs.

## Concept

This was the mockup that I created when I first had the idea:

![Code shown with colored boxes around sections of code that represent AST nodes](images/concept.png)

Note that this example is in the Gleam programming language whereas the app currently only supports Elixir.

## Examples

**Shows precedence**

![An example of Reveal showing the precedence of binary operators](images/arithmetic.png)

**Node names available on hover**

![An example of Reveal showing the label "arguments" on a box around a module's name in a defmodule expression](images/module.png)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.  Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.  You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.  It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  Your app is ready to be deployed!
