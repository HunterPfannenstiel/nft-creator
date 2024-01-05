import { PageComponentProps } from "@/lib/pages/types";
import { FunctionComponent, ReactNode, useContext, createContext } from "react";

const PageData = createContext<PageComponentProps>({
  setValidity: (validity: boolean) => {},
});

type PageDataProviderProps = {
  children: ReactNode;
} & PageComponentProps;

const PageDataProvider: FunctionComponent<PageDataProviderProps> = ({
  children,
  setValidity,
}) => {
  return (
    <PageData.Provider value={{ setValidity }}>{children}</PageData.Provider>
  );
};

export default PageDataProvider;

export const usePageData = () => {
  return useContext(PageData);
};
