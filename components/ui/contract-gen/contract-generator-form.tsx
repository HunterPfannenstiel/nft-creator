"use client";

import { FunctionComponent } from "react";
import { FeatureDetails, FeatureInfo } from "./types";
import Pages from "@/lib/pages";
import useContractPages from "./state/useContractPages";

type Props = {
  featureInfo: FeatureInfo;
};

const ContractGeneratorForm: FunctionComponent<Props> = ({ featureInfo }) => {
  const formData = useContractPages();

  const submitHandler = () => {
    console.log(formData.contractData);
  };

  return <Pages pages={formData.getContractPages()} onSubmit={submitHandler} />;
};

export default ContractGeneratorForm;

const getNewFeatureComponents = (
  newFeatures: (keyof FeatureDetails)[],
  featureInfo: FeatureInfo
) => {
  return newFeatures
    .map((feature) => {
      if (featureInfo[feature].component !== undefined) {
        return { component: featureInfo[feature].component!, feature };
      }
    })
    .filter((p) => p !== undefined);
};
