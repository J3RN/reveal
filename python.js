export const colorMapping = {
  function_definition: [270, 50, 90],
  while_statement:     [285, 50, 90],
  assignment:          [350, 50, 90],
  call:                [ 56, 50, 90],
  identifier:          [ 27, 50, 90],
  parameters:          [311, 50, 90],
  argument_list:       [311, 50, 90],
  keyword_argument:    [263, 50, 90],
  integer:             [180, 50, 90],
  string:              [195, 50, 90],
  true:                [165, 50, 90],
  false:               [165, 50, 90],
  binary_operator:     [126, 50, 90],
  comparison_operator: [126, 50, 90],
  boolean_operator:    [126, 50, 90],
  not_operator:        [126, 50, 90],
  tuple:               [135, 50, 90],
  list:                [126, 50, 90],
  comment:             [185, 50, 90],
};

export const defaultProgram =
  "def fib(n):\n\
    a, b = 0, 1\n\
    while a < n :\n\
        print(a, end=' ')\n\
        a, b = b, a + b\n\
    print()\n\
print(1000)";

export const treeSitterWasm = 'tree-sitter-python.wasm';
