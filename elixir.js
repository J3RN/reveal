export const colorMapping = {
  call:            [ 56, 50, 90],
  identifier:      [ 27, 50, 90],
  alias:           [356, 50, 90],
  arguments:       [311, 50, 90],
  keyword:         [263, 50, 90],
  keywords:        [215, 50, 90],
  string:          [195, 50, 90],
  pair:            [185, 50, 90],
  do_block:        [167, 50, 90],
  binary_operator: [126, 50, 90],
  unary_operator:  [126, 50, 90],
  tuple:           [126, 50, 90],
  list:            [126, 50, 90],
  comment:         [185, 50, 90],
};

export const defaultProgram = 'defmodule Foo.Bar do\n  def hello_world, do: "Hello, world!"\nend';

export const treeSitterWasm = 'tree-sitter-elixir.wasm';
