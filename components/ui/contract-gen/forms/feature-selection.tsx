import { PageComponent } from "@/lib/pages/types";
import {
  ContractFeature,
  FeatureDetail,
  FeatureSelections,
  FormUpdateDel,
} from "../types";
import SelectionInput from "../../reusable/label-input/selection-input";
import { Option } from "../../reusable/label-input/selection-input/types";
import { useEffect } from "react";

type Props = {
  features: FeatureDetail[];
  setFeature: FormUpdateDel<FeatureSelections>;
  selectedFeatures: FeatureSelections;
};

const FeatureSelection: PageComponent<Props> = ({
  setValidity,
  features,
  setFeature,
  selectedFeatures,
}) => {
  useEffect(() => {
    setValidity(true);
  }, []);

  const featureHandler = (feature: ContractFeature) => {
    setFeature(feature, !!!selectedFeatures[feature]);
  };

  const options: Option[] = features.map((feature) => {
    return {
      label: feature.label,
      id: feature.name,
      checked: !!selectedFeatures[feature.name],
    };
  });
  return (
    <SelectionInput
      labelText="Feature Selection"
      options={options}
      type="checkbox"
      onClick={(option) => {
        featureHandler(option.id as ContractFeature);
      }}
    />
  );
};

export default FeatureSelection;
