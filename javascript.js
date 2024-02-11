import commonColors from './common_colors';

export const colorMapping = {
  ...commonColors,
  shorthand_property_identifier: commonColors.identifier,
  property_identifier:  30,
  call_expression:      commonColors.call,
  member_expression:    75,
  import_statement:     120,
  export_statement:     120,
  number:               commonColors.primitive,
  string:               commonColors.collection,
  array:                commonColors.collection,
  object:               commonColors.collection,
  arrow_function:       commonColors.function,
  function_declaration: commonColors.function,
  formal_parameters:    commonColors.parameters,
  arguments:            commonColors.parameters,
  lexical_declaration:  commonColors.declaration,
};

export const defaultProgram =
  'export default const hello_world = () => console.log("hello world!");';

export const treeSitterWasm = 'tree-sitter-javascript.wasm';
