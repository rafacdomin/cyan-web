import React, { useRef, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
}
const AsyncSelect: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value,
          );
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      clearValue: (ref: any) => {
        ref.select.state.value = null;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <Select
      cacheOptions
      className="react-select-container"
      classNamePrefix="react-select"
      defaultValue={defaultValue}
      ref={selectRef}
      {...rest}
    />
  );
};
export default AsyncSelect;
