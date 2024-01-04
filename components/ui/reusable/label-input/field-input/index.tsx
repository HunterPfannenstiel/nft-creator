import { ComponentPropsWithRef, FunctionComponent } from "react";
import { Layout } from "../types";
import LabelInput from "..";

type FieldInputProps = {
  labelText?: string;
  layout?: Layout;
  gap?: string;
  labelClassName?: string;
  onChange: (inputValue: string) => void;
} & Omit<ComponentPropsWithRef<"input">, "onChange">;

const FieldInput: FunctionComponent<FieldInputProps> = ({
  labelText,
  layout,
  gap,
  labelClassName,
  onChange,
  ...inputProps
}) => {
  return (
    <LabelInput
      labelText={labelText}
      layout={layout}
      gap={gap}
      labelClassName={labelClassName}
      inputId={inputProps.id}
      inputComponent={
        <input
          {...inputProps}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      }
    />
  );
};

export default FieldInput;
