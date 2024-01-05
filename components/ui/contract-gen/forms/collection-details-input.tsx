import { PageComponent } from "@/lib/pages/types";
import { CollectionDetails, FormUpdateDel } from "../types";
import FieldInput from "../../reusable/label-input/field-input";
import { useEffect } from "react";

type Props = {
  setDetails: FormUpdateDel<CollectionDetails>;
  initialDetails?: CollectionDetails;
};

const CollectionDetailsInput: PageComponent<Props> = ({
  setValidity,
  setDetails,
  initialDetails,
}) => {
  useEffect(() => {
    if (!initialDetails || !initialDetails.name || !initialDetails.image) {
      setValidity(false);
    } else {
      setValidity(true);
    }
  }, [initialDetails]);
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
        value={initialDetails?.name}
        required
      />
      <FieldInput
        labelText="Summary"
        id="collection-summary"
        onChange={summaryHandler}
        value={initialDetails?.summary}
        required
      />
    </fieldset>
  );
};

export default CollectionDetailsInput;
