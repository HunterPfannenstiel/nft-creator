import { PageComponent } from "@/lib/pages/types";
import { ContractType } from "../types";
import SelectionInput from "../../reusable/label-input/selection-input";
import { useEffect } from "react";

type Props = {
  setType: (type: ContractType) => void;
  selectedType?: ContractType;
};

const ContractTypeSelect: PageComponent<Props> = ({
  setValidity,
  setType,
  selectedType,
}) => {
  useEffect(() => {
    setValidity(!!selectedType);
  }, [selectedType]);
  return (
    <SelectionInput
      labelText="Contract Type"
      options={[
        { label: "ERC721", id: "721", checked: selectedType === "ERC721" },
        { label: "ERC1155", id: "1155", checked: selectedType === "ERC1155" },
      ]}
      type="radio"
      onClick={(option) => {
        setType(option.label as ContractType);
      }}
    />
  );
};

export default ContractTypeSelect;
