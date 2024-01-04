import { FunctionComponent, ReactElement } from "react";
import { Layout } from "./types";

type LabelInputProps = {
  labelText?: string;
  layout?: Layout;
  gap?: string;
  inputComponent: ReactElement | ReactElement[];
  labelClassName?: string;
  inputId?: string;
}; //& ComponentPropsWithRef<"input">;

const LabelInput: FunctionComponent<LabelInputProps> = ({
  labelText,
  layout = "Block",
  gap,
  inputComponent,
  labelClassName,
  inputId,
}) => {
  return (
    <div
      style={{ display: "flex", flexDirection: toFlexDirection(layout), gap }}
    >
      {labelText && (
        <label className={labelClassName} htmlFor={inputId}>
          {labelText}
        </label>
      )}
      {inputComponent}
    </div>
  );
};

export default LabelInput;

const toFlexDirection = (layout: Layout) => {
  switch (layout) {
    case "Block":
      return "column";
    case "ReverseBlock":
      return "column-reverse";
    case "Inline":
      return "row";
    case "ReverseInline":
      return "row-reverse";
  }
};
