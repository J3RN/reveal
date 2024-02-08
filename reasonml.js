export const colorMapping = {
  type_declaration:    [220, 50, 90],
  let_binding:         [350, 50, 90],
  string:              [195, 50, 90],
  value_identifier:    [ 27, 50, 90],
  variant_identifier:  [264, 50, 90],
  variant_declaration: [196, 50, 90],
  switch_expression:   [108, 50, 90],
  function:            [270, 50, 90],
  call_expression:     [ 56, 50, 90],
  binary_expression:   [126, 50, 90],
  number:              [180, 50, 90],
};

export const defaultProgram =
  'type schoolPerson = Teacher | Director | Student(string);\n\n\
let greeting = person =>\n\
  switch (person) {\n\
  | Teacher => "Hey Professor!"\n\
  | Director => "Hello Director."\n\
  | Student("Richard") => "Still here Rickey?"\n\
  | Student(anyOtherName) => "Hey, " ++ anyOtherName ++ "."\n\
};';

export const treeSitterWasm = 'tree-sitter-reason.wasm';
