import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactElement,
} from "react";

type SubmitButtonProps = {
  children?: ReactElement;
} & ComponentPropsWithoutRef<"button">;

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  children,
  ...props
}) => {
  return <button {...props}>{children || "Submit"}</button>;
};

export default SubmitButton;
