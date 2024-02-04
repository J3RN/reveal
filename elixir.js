export const colorMapping = {
  call:            [ 56,  19,  98],
  identifier:      [ 27,  18,  99],
  alias:           [356,  19, 100],
  arguments:       [311,  20,  95],
  keyword:         [263,  23,  94],
  keywords:        [215,  33,  95],
  string:          [195,  41,  96],
  pair:            [185,  42,  96],
  do_block:        [167,  38,  96],
  binary_operator: [126,  26,  98],
  unary_operator:  [126,  26,  98],
  tuple:           [126,  26,  98],
  list:            [126,  26,  98],
  comment:         [185,  42,  96],
};

export const defaultProgram = 'defmodule Foo.Bar do\n  def hello_world, do: "Hello, world!"\nend';

export const treeSitterWasm = 'tree-sitter-elixir.wasm';
