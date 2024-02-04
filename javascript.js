export const colorMapping = {
  export_statement:     [123, 45, 92],
  arrow_function:       [270, 45, 90],
  function_declaration: [270, 45, 90],
  call_expression:      [ 56, 19, 98],
  formal_parameters:    [311, 20, 95],
  arguments:            [311, 20, 95],
  string:               [195, 41, 96],
  number:               [180, 26, 90],
  identifier:           [ 27, 18, 99],
  lexical_declaration:  [350, 40, 90]
};

export const defaultProgram =
  'export default const hello_world = () => console.log("hello world!");';

export const treeSitterWasm = 'tree-sitter-javascript.wasm';
