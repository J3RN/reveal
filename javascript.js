export const colorMapping = {
  export_statement:     [123, 50, 90],
  arrow_function:       [270, 50, 90],
  function_declaration: [270, 50, 90],
  call_expression:      [ 56, 50, 90],
  formal_parameters:    [311, 50, 90],
  arguments:            [311, 50, 90],
  string:               [195, 50, 90],
  number:               [180, 50, 90],
  identifier:           [ 27, 50, 90],
  lexical_declaration:  [350, 50, 90]
};

export const defaultProgram =
  'export default const hello_world = () => console.log("hello world!");';

export const treeSitterWasm = 'tree-sitter-javascript.wasm';
