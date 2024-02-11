import commonColors from "./common_colors";

export const colorMapping = {
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
};

export const defaultProgram =
  "def fib(n):\n\
    a, b = 0, 1\n\
    while a < n:\n\
        print(a, end=' ')\n\
        a, b = b, a + b\n\
    print()\n\
print(1000)";

export const treeSitterWasm = 'tree-sitter-python.wasm';
