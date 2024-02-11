import commonColors from "./common_colors";

export const colorMapping = {
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
