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
  initialFeatures?: FeatureSelections;
};

const FeatureSelection: PageComponent<Props> = ({
  setValidity,
  features,
  setFeature,
  initialFeatures,
}) => {
  useEffect(() => {
    setValidity(!!initialFeatures);
  }, [initialFeatures]);

  const featureHandler = (feature: ContractFeature) => {
    if (initialFeatures === undefined) setFeature(feature, true);
    else setFeature(feature, !initialFeatures[feature]);
  };

  const options: Option[] = features.map((feature) => {
    return {
      label: feature.label,
      id: feature.name,
      checked: initialFeatures ? !!initialFeatures[feature.name] : false,
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
