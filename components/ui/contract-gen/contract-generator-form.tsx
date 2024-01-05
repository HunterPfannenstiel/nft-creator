import { FunctionComponent, useEffect, useState } from "react";
import useContractFormData from "./state/useContractFormData";
import { ContractFeature, FeatureDetails, FeatureInfo } from "./types";
import { PageDetail } from "@/lib/pages/types";
import Page from "@/lib/pages/page";
import Pages from "@/lib/pages";

type SelectedFeaturePage = { feature: ContractFeature } & PageDetail;

type Props = {
  featureInfo: FeatureInfo;
};

const ContractGeneratorForm: FunctionComponent<Props> = ({ featureInfo }) => {
  const formData = useContractFormData();
  const [featurePages, setFeaturePages] = useState<SelectedFeaturePage[]>([]);

  const submitHandler = () => {
    console.log("submit!");
  };
  useEffect(() => {
    const features = formData.getSelectedFeatures();
    const newFeatures = features.filter(
      (f) => featurePages.findIndex((p) => p.feature === f) === -1
    );
    const pages = getNewFeatureComponents(newFeatures, featureInfo);
    const newFeaturePages = pages.map((page) => {
      return {
        page: (
          <Page
            as={page!.component}
            {...formData.getFeatureDetailProps(page!.feature)}
          />
        ),
        feature: page!.feature,
        title: <>{featureInfo[page!.feature].label}</>,
      };
    });

    if (pages.length !== 0) {
      setFeaturePages((prevPages) => {
        return [...prevPages, ...newFeaturePages];
      });
    }
  }, [formData.contractData.contractFeatures]);
  return <Pages pages={featurePages} onSubmit={submitHandler} />;
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
