import { ComponentPropsWithoutRef, ElementType } from "react";
import { PageComponentProps } from "../lib/pages/types";

type AsProp<C extends ElementType> = { as?: C };

type OmitProps<C extends ElementType, Props> = keyof (Props & AsProp<C>);

export type PolymorphicComponent<C extends ElementType, Props = {}> = Omit<
  ComponentPropsWithoutRef<C>,
  OmitProps<C, Props>
> &
  AsProp<C> &
  Props;

type DefiniteAsProp<C extends ElementType> = { as: C };

export type PolymorphicPageComponent<C extends ElementType> = Omit<
  ComponentPropsWithoutRef<C>,
  OmitProps<C, PageComponentProps>
> &
  DefiniteAsProp<C>;
