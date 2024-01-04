"use client";

import classes from "./page.module.css";
import Pages from "@/lib/pages";
import { PageDetail } from "@/lib/pages/pages";
import { FunctionComponent, useState } from "react";
import TestPage1 from "./test-page";
import TestPage2 from "./test-page2";
import Page from "@/lib/pages/page";

const TestPage: FunctionComponent = () => {
  const [submitting, setSubmitting] = useState(false);
  const pageSubmitHandler = () => {
    setSubmitting(true);
    console.log("Submitted!");
  };
  const pages: PageDetail[] = [
    {
      page: <Page as={TestPage1} />,
      title: <h1>The first test page</h1>,
    },
    {
      page: <Page as={TestPage2} initialState={1} />,
      title: <h1>The secnd test page</h1>,
    },
  ];
  return (
    <main>
      <div className={classes.pages}>
        <Pages
          pages={pages}
          disableSubmit={submitting}
          onSubmit={pageSubmitHandler}
        />
      </div>
    </main>
  );
};

export default TestPage;
