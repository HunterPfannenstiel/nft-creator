import { ComponentPropsWithRef, FunctionComponent } from "react";
import { Option } from "./types";
import { Layout } from "../types";
import LabelInput from "..";

type SelectionInputProps = {
  options: Option[];
  labelText?: string;
  layout?: Layout;
  gap?: string;
  inputLayout?: Layout;
  onClick: (id: string) => void;
  labelClassName?: string;
  inputLabelClassName?: string;
  generalInputProps: Omit<
    ComponentPropsWithRef<"input">,
    "type" & "checked" & "onClick"
  > & {
    type: "checkbox" | "radio";
  };
};

const SelectionInput: FunctionComponent<SelectionInputProps> = ({
  options,
  labelText,
  layout,
  gap,
  inputLayout,
  onClick,
  labelClassName,
  inputLabelClassName,
  generalInputProps,
}) => {
  return (
    <LabelInput
      labelText={labelText}
      layout={layout}
      gap={gap}
      labelClassName={labelClassName}
      inputComponent={options.map((option) => {
        return (
          <LabelInput
            labelText={option.label}
            inputId={option.id}
            labelClassName={inputLabelClassName}
            layout={inputLayout}
            inputComponent={
              <input
                {...generalInputProps}
                checked={option.checked}
                onClick={() => {
                  onClick(option.id);
                }}
              />
            }
          />
        );
      })}
    />
  );
};

export default SelectionInput;
