import { FunctionComponent, ReactElement } from "react";

type ValidityDel = (validity: boolean) => void;

type PageNavigator = (page: number) => void;

export type PageComponentProps = { setValidity: ValidityDel };

export type SummaryComponentProps = {
  navigateToPage: PageNavigator | undefined;
};

export type SummaryComponent = FunctionComponent<SummaryComponentProps>;

export type PageDetail = { page: ReactElement; title?: ReactElement };

export type PageButtons = {
  left: ReactElement;
  right: ReactElement;
  submit: ReactElement;
};
