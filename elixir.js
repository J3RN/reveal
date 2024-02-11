import commonColors from './common_colors';

export const colorMapping = {
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
};

export const defaultProgram = 'defmodule Foo.Bar do\n  def hello_world, do: "Hello, world!"\nend';

export const treeSitterWasm = 'tree-sitter-elixir.wasm';
