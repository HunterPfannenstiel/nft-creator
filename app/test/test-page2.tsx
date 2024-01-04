import { PageComponentProps } from "@/lib/pages/pages";
import { FunctionComponent, useEffect } from "react";

type TestPageProps = {
  initialState: number;
} & PageComponentProps;

const TestPage2: FunctionComponent<TestPageProps> = ({
  setValidity,
  initialState,
}) => {
  useEffect(() => {
    console.log("My initial state!", initialState);
    setValidity(!!initialState);
  }, []);
  return (
    <div>
      <h1>This is a test page</h1>
      <p>Please select an input to make this page valid</p>
      <div>
        <label htmlFor="e1">E</label>
        <input
          type="radio"
          id="e1"
          name="radios"
          onClick={() => setValidity(true)}
          checked={initialState === 1}
        />
        <label htmlFor="ee1">EE</label>
        <input
          type="radio"
          id="ee1"
          name="radios"
          onClick={() => setValidity(true)}
          checked={initialState === 2}
        />
        <label htmlFor="eee1">EEE</label>
        <input
          type="radio"
          id="eee1"
          name="radios"
          onClick={() => setValidity(true)}
          checked={initialState === 3}
        />
      </div>
    </div>
  );
};

export default TestPage2;
