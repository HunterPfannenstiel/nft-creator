import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type NavButtonProps = {
  dir: "left" | "right";
} & ComponentPropsWithoutRef<"button">;

const NavButton: FunctionComponent<NavButtonProps> = ({ dir, ...props }) => {
  return (
    <button {...props}>{dir === "left" ? "Go Back" : "Go Forward"}</button>
  );
};

export default NavButton;
