import { PolymorphicPageComponent } from "@/types/polymorphic";
import { ElementType } from "react";
import { usePageData } from "./state/page-data";

//TODO: Define T to extend ElementType that MUST accept PageComponentProps (but can also accept other props)

const Page = <T extends ElementType>({
  as,
  ...restProps
}: PolymorphicPageComponent<T>) => {
  const pageData = usePageData();
  const Component = as;
  return <Component {...(restProps as any)} {...pageData} />;
};

export default Page;

export type PageComponent = typeof Page;
