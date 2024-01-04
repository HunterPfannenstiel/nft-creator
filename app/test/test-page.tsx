import classes from "./test-page.module.css";
import { PageComponentProps } from "@/lib/pages/pages";
import { FunctionComponent } from "react";

type TestPageProps = {} & PageComponentProps;

const TestPage1: FunctionComponent<TestPageProps> = ({ setValidity }) => {
  return (
    <div className={classes.content}>
      <h1>This is a test page</h1>
      <p>Please select an input to make this page valid</p>
      <div>
        <label htmlFor="e">E</label>
        <input
          type="radio"
          id="e"
          name="radios"
          onClick={() => setValidity(true)}
        />
        <label htmlFor="ee">EE</label>
        <input
          type="radio"
          id="ee"
          name="radios"
          onClick={() => setValidity(true)}
        />
        <label htmlFor="eee">EEE</label>
        <input
          type="radio"
          id="eee"
          name="radios"
          onClick={() => setValidity(true)}
        />
      </div>
    </div>
  );
};

export default TestPage1;
