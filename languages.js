import commonColors from './common_colors';

export default [
  {
    name: 'JavaScript',
    colorMapping: {
      ...commonColors,
      shorthand_property_identifier: commonColors.identifier,
      property_identifier:  30,
      unary_expression:     commonColors.call,
      binary_expression:    commonColors.call,
      call_expression:      commonColors.call,
      member_expression:    75,
      import_statement:     120,
      export_statement:     120,
      true:                 commonColors.primitive,
      false:                commonColors.primitive,
      number:               commonColors.primitive,
      string:               commonColors.collection,
      array:                commonColors.collection,
      object:               commonColors.collection,
      arrow_function:       commonColors.function,
      function_declaration: commonColors.function,
      formal_parameters:    commonColors.parameters,
      arguments:            commonColors.parameters,
      lexical_declaration:  commonColors.declaration,
    },
    defaultProgram: 'export default const hello_world = () => console.log("hello world!");',
    treeSitterWasm: 'tree-sitter-javascript.wasm',
  },
  {
    name: 'Python',
    colorMapping: {
      ...commonColors,
      function_definition: commonColors.function,
      while_statement:     285,
      assignment:          commonColors.declaration,
      argument_list:       commonColors.parameters,
      integer:             commonColors.primitive,
      string:              commonColors.primitive,
      true:                commonColors.primitive,
      false:               commonColors.primitive,
      binary_operator:     commonColors.call,
      comparison_operator: commonColors.call,
      boolean_operator:    commonColors.call,
      not_operator:        commonColors.call,
      keyword_argument:    commonColors.collection,
      tuple:               commonColors.collection,
      list:                commonColors.collection,
    },
    defaultProgram:
      "def fib(n):\n\
    a, b = 0, 1\n\
    while a < n:\n\
        print(a, end=' ')\n\
        a, b = b, a + b\n\
    print()\n\
fib(1000)",
    treeSitterWasm: 'tree-sitter-python.wasm',
  },
  {
    name: 'Elixir',
    colorMapping: {
      ...commonColors,
      binary_operator: commonColors.call,
      unary_operator:  commonColors.call,
      keyword:         150,
      integer:         commonColors.primitive,
      float:           commonColors.primitive,
      char:            commonColors.primitive,
      pair:            225,
      keywords:        commonColors.collection,
      list:            commonColors.collection,
      charlist:        commonColors.collection,
      map:             commonColors.collection,
      string:          commonColors.collection,
      tuple:           commonColors.collection,
      do_block:        commonColors.block,
      arguments:       commonColors.parameters,
      alias:           345,
    },
    defaultProgram: 'defmodule Foo.Bar do\n  def hello_world, do: "Hello, world!"\nend',
    treeSitterWasm: 'tree-sitter-elixir.wasm',
  },
  {
    name: 'ReasonML',
    colorMapping: {
      ...commonColors,
      string:              commonColors.collection,
      value_identifier:    commonColors.identifier,
      switch_expression:   105,
      type_identifier:     120,
      variant_identifier:  135,
      variant_declaration: 150,
      function:            commonColors.function,
      call_expression:     commonColors.call,
      binary_expression:   commonColors.call,
      number:              commonColors.primitive,
      let_binding:         commonColors.declaration,
      type_declaration:    commonColors.declaration,
    },
    defaultProgram:
      'type schoolPerson = Teacher | Director | Student(string);\n\n\
let greeting = person =>\n\
  switch (person) {\n\
  | Teacher => "Hey Professor!"\n\
  | Director => "Hello Director."\n\
  | Student("Richard") => "Still here Rickey?"\n\
  | Student(anyOtherName) => "Hey, " ++ anyOtherName ++ "."\n\
};',
    treeSitterWasm: 'tree-sitter-reason.wasm',
  },
  {
    name: 'Gleam',
    colorMapping: {
      ...commonColors,
      label: 30,
      function_call: commonColors.call,
      binary_expression: commonColors.call,
      boolean_negation: commonColors.call,
      integer_negation: commonColors.call,
      field_access: 75,
      import: 120,
      keyword: 150,
      integer: commonColors.primitive,
      float: commonColors.primitive,
      char: commonColors.primitive,
      pair: 225,
      keywords: commonColors.collection,
      list: commonColors.collection,
      charlist: commonColors.collection,
      map: commonColors.collection,
      string: commonColors.collection,
      tuple: commonColors.collection,
      anonymous_function: commonColors.function,
      arguments: commonColors.parameters,
      function_parameters: commonColors.parameters,
      alias: 345,
      let: commonColors.declaration,
      type_identifier: 120,
    },
    defaultProgram:
      'import gleam/io\n\n\
pub fn main() {\n\
  io.println("hello, friend!")\n\
}',
    treeSitterWasm: 'tree-sitter-gleam.wasm',
  },
];
