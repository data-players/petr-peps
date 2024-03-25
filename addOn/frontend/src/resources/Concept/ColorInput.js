import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FieldProps, Labeled } from 'react-admin';
import { SketchPicker } from 'react-color';

const ColorInput = (props) => {
  const { source } = props;
  const { control } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({ name: source, control });

  console.log(value)

  return (
    <Labeled source={source} {...props}>
      <SketchPicker color={value} onChange={(color) => onChange(color.hex)} />
    </Labeled>
  );
};

export default ColorInput;