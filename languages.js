import commonColors from './common_colors';

export default [
  {
    name: 'JavaScript',
    colorMapping: {
      ...commonColors,
      shorthand_property_identifier: commonColors.identifier,
      property_identifier:  commonColors.property,
      unary_expression:     commonColors.call,
      binary_expression:    commonColors.call,
      call_expression:      commonColors.call,
      update_expression:    commonColors.call,
      augmented_assignment_expression: commonColors.call,
      /* This is pretty wrong, semantically, and I feel bad about that */
      break_statement:      commonColors.call,
      member_expression:    75,
      statement_block:      commonColors.block,
      import_statement:     120,
      export_statement:     120,
      do_statement:         commonColors.control,
      if_statement:         commonColors.control,
      switch_statement:     commonColors.control,
      while_statement:      commonColors.control,
      true:                 commonColors.primitive,
      false:                commonColors.primitive,
      number:               commonColors.primitive,
      object:               commonColors.collection,
      jsx_self_closing_element: commonColors.collection,
      jsx_element:          commonColors.collection,
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
      assignment:          commonColors.declaration,
      binary_operator:     commonColors.call,
      comparison_operator: commonColors.call,
      boolean_operator:    commonColors.call,
      not_operator:        commonColors.call,
      if_statement:        commonColors.control,
      while_statement:     commonColors.control,
      integer:             commonColors.primitive,
      string:              commonColors.primitive,
      true:                commonColors.primitive,
      false:               commonColors.primitive,
      keyword_argument:    commonColors.collection,
      function_definition: commonColors.function,
      argument_list:       commonColors.parameters,
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
    name: 'Go',
    colorMapping: {
      ...commonColors,
      field_identifier:     commonColors.property,
      import_declaration:   commonColors.import,
      interpreted_string_literal: commonColors.collection,
      function_declaration: commonColors.function,
      parameter_list:       commonColors.parameters,
    },
    defaultProgram: 'package main\n\
\n\
import "fmt"\n\
\n\
func main() {\n\
    fmt.Println("Hello, World!")\n\
}',
    treeSitterWasm: 'tree-sitter-go.wasm',
  },
  {
    name: 'Elixir',
    colorMapping: {
      ...commonColors,
      binary_operator: commonColors.call,
      unary_operator:  commonColors.call,
      keyword:         150,
      boolean:         commonColors.primitive,
      integer:         commonColors.primitive,
      float:           commonColors.primitive,
      char:            commonColors.primitive,
      pair:            225,
      keywords:        commonColors.collection,
      charlist:        commonColors.collection,
      map:             commonColors.collection,
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
      value_identifier:    commonColors.identifier,
      switch_expression:   commonColors.control,
      type_identifier:     120,
      variant_identifier:  135,
      variant_declaration: 150,
      function:            commonColors.function,
      call_expression:     commonColors.call,
      binary_expression:   commonColors.call,
      true:                commonColors.primitive,
      false:               commonColors.primitive,
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
      label:               30,
      let:                 commonColors.declaration,
      type_definition:     commonColors.declaration,
      function_call:       commonColors.call,
      binary_expression:   commonColors.call,
      boolean_negation:    commonColors.call,
      integer_negation:    commonColors.call,
      field_access:        75,
      import:              105,
      type_identifier:     120,
      constructor_name:    135,
      case:                commonColors.control,
      data_constructor:    150,
      keyword:             150,
      integer:             commonColors.primitive,
      float:               commonColors.primitive,
      char:                commonColors.primitive,
      pair:                225,
      keywords:            commonColors.collection,
      charlist:            commonColors.collection,
      map:                 commonColors.collection,
      anonymous_function:  commonColors.function,
      arguments:           commonColors.parameters,
      function_parameters: commonColors.parameters,
      module:              345,
    },
    defaultProgram:
      'import gleam/io\n\n\
pub fn main() {\n\
  io.println("hello, friend!")\n\
}',
    treeSitterWasm: 'tree-sitter-gleam.wasm',
  },
];
