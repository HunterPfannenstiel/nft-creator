import { useEffect, useState } from "react";
import {
  ContractData,
  ContractFeature,
  FeatureDetails,
  FeatureOptions,
} from "../types";
import useContractFormData from "./useContractFormData";
import Page from "@/lib/pages/page";
import ContractTypeSelect from "../forms/contract-type-select";
import CollectionDetailsInput from "../forms/collection-details-input";
import FeatureSelection from "../forms/feature-selection";
import { PageDetail } from "@/lib/pages/types";

const useContractPages = (
  initialData?: ContractData,
  intitalFeatureDetails?: FeatureDetails
) => {
  const formData = useContractFormData(initialData, intitalFeatureDetails);

  const [selectedFeatures, setSelectedFeatures] = useState<ContractFeature[]>(
    getInitialCurrentFeatures(intitalFeatureDetails)
  );

  //   const getFeaturePages = (newFeatures: ContractFeature[]) => {

  //   };

  const getContractPages = (): PageDetail[] => {
    const typePage = (
      <Page as={ContractTypeSelect} {...formData.getTypeProps()} />
    );
    const detailsPage = (
      <Page as={CollectionDetailsInput} {...formData.getDetailProps()} />
    );
    const featureSelectionPage = (
      <Page
        as={FeatureSelection}
        features={FeatureOptions}
        {...formData.getFeatureProps()}
      />
    );
    return [
      { page: typePage, title: <>Select a Contract Type</> },
      { page: detailsPage, title: <>Provide Collection Details</> },
      { page: featureSelectionPage, title: <>Select Features</> },
    ];
  };

  return { ...formData, getContractPages };

  //   useEffect(() => {
  //     const features = contractFormData.getSelectedFeatures();
  //     const newFeatures = features.filter(
  //       (f) => currentFeatures.findIndex((p) => p === f) === -1
  //     );
  //     const pages = getNewFeatureComponents(newFeatures, featureInfo);
  //     const newFeaturePages = pages.map((page) => {
  //       return {
  //         page: (
  //           <Page
  //             as={page!.component}
  //             {...formData.getFeatureDetailProps(page!.feature)}
  //           />
  //         ),
  //         feature: page!.feature,
  //         title: <>{featureInfo[page!.feature].label}</>,
  //       };
  //     });

  //     if (pages.length !== 0) {
  //       setFeaturePages((prevPages) => {
  //         return [...prevPages, ...newFeaturePages];
  //       });
  //     }
  //   }, [formData.contractData.contractFeatures]);
};

export default useContractPages;

const getInitialCurrentFeatures = (intitalFeatureDetails?: FeatureDetails) => {
  if (!intitalFeatureDetails) return [];
  return Object.keys(intitalFeatureDetails) as ContractFeature[];
};
