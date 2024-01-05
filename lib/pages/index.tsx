import useValidState from "@/lib/pages/state/useValidState";
import { PageButtons, PageDetail, SummaryComponent } from "@/lib/pages/types";
import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactElement,
} from "react";
import usePages from "@/lib/pages/state/usePages";
import NavButton from "./nav-button";
import SubmitButton from "./submit-button";
import PageDataProvider from "./state/page-data";
import PageDisplay from "./page-display";

type PagesProps = {
  pages: PageDetail[];
  SummaryPage?: SummaryComponent;
  onSubmit: () => void;
  disableSubmit?: boolean;
  pageButtons?: PageButtons;
};

const Pages: FunctionComponent<PagesProps> = ({
  pages,
  SummaryPage,
  onSubmit,
  disableSubmit,
  pageButtons,
}) => {
  if (pages.length === 0) return null;
  //Whether the current page is valid or not (e.g. all required fields are filled in)
  const [isValid, setValidity] = useValidState();

  //Details about the current state of the pages
  let pageCount = pages.length;
  if (!!SummaryPage) pageCount++;
  const pageState = usePages(pageCount);

  //The current page to display on screen
  let pageComponent: ReactElement;
  if (!pageState.hasNextPage && !!SummaryPage) {
    //If there is no next page and there is a summary page
    pageComponent = <SummaryPage navigateToPage={pageState.navigateToPage} />;
  } else {
    pageComponent = pages[pageState.currentPage].page;
  }

  return (
    <form>
      <PageDataProvider setValidity={setValidity}>
        <PageDisplay
          component={pageComponent}
          title={pages[pageState.currentPage].title}
          pageButtons={getPageButtons(
            {
              onClick: pageState.flipBack,
              disabled: !pageState.hasPrevPage || disableSubmit,
            },
            {
              onClick: pageState.flipForward,
              disabled: !pageState.hasNextPage || !isValid,
            },
            {
              onClick: onSubmit,
              hidden: pageState.hasNextPage,
              disabled: !isValid || disableSubmit,
              type: "button",
            },
            pageButtons
          )}
          hasPrevPage={pageState.hasPrevPage}
          hasNextPage={pageState.hasNextPage}
        />
      </PageDataProvider>
    </form>
  );
};

export default Pages;

type ButtonProps = ComponentPropsWithoutRef<"button">;

//Gets the page buttons and returns the default buttons if user did not specify any
const getPageButtons = (
  leftButtonProps: ButtonProps,
  rightButtonProps: ButtonProps,
  submitButtonProps: ButtonProps,
  userPageButtons?: PageButtons
): PageButtons => {
  if (userPageButtons) {
    const { left, right, submit } = userPageButtons;
    return {
      left: <button {...leftButtonProps}>{left}</button>,
      right: <button {...rightButtonProps}>{right}</button>,
      submit: <button {...submitButtonProps}>{submit}</button>,
    };
  }
  return {
    left: <NavButton {...leftButtonProps} dir="left" />,
    right: <NavButton {...rightButtonProps} dir="right" />,
    submit: <SubmitButton {...submitButtonProps} children={undefined} />,
  };
};
