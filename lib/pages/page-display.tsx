import classes from "./page-display.module.css";
import { PageButtons } from "@/lib/pages/pages";
import { FunctionComponent, ReactElement } from "react";

type PageDisplayProps = {
  component: ReactElement;
  title?: ReactElement;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  pageButtons: PageButtons;
};

const PageDisplay: FunctionComponent<PageDisplayProps> = (pageProps) => {
  return (
    <section>
      {pageProps.title && pageProps.title}
      {pageProps.component}
      <div className={classes.buttons}>
        {pageProps.pageButtons.left}
        {!pageProps.hasNextPage && pageProps.pageButtons.submit}
        {pageProps.pageButtons.right}
      </div>
    </section>
  );
};

export default PageDisplay;
