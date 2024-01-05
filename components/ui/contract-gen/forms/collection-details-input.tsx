import { PageComponent } from "@/lib/pages/types";
import { CollectionDetails, FormUpdateDel } from "../types";
import FieldInput from "../../reusable/label-input/field-input";
import { useEffect } from "react";

type Props = {
  setDetails: FormUpdateDel<CollectionDetails>;
  details: CollectionDetails;
};

const CollectionDetailsInput: PageComponent<Props> = ({
  setValidity,
  setDetails,
  details,
}) => {
  useEffect(() => {
    if (!details.name) {
      //|| !details.image
      setValidity(false);
    } else {
      setValidity(true);
    }
  }, [details]);
  const nameHandler = (value: string) => {
    setDetails("name", value);
  };
  const summaryHandler = (value: string) => {
    setDetails("summary", value);
  };
  return (
    <fieldset>
      <FieldInput
        labelText="Name"
        id="collection-name"
        onChange={nameHandler}
        value={details.name}
        required
      />
      <FieldInput
        labelText="Summary"
        id="collection-summary"
        onChange={summaryHandler}
        value={details.summary}
        required
      />
    </fieldset>
  );
};

export default CollectionDetailsInput;
