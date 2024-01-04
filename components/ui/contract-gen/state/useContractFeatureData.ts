import useFormData from "@/lib/form-data/useFormData";
import { FeatureDetails, FormUpdateDel } from "../types";

const useContractFeatureData = (initialDetails?: FeatureDetails) => {
  const [featureData, setFeatureData] = useFormData<FeatureDetails>(
    initialDetails || {}
  );

  const getFeatureUpdateDel = <F extends keyof FeatureDetails>(
    feature: F
  ): FormUpdateDel<FeatureDetails[F]> => {
    return (key, value) => {
      setFeatureData(value, feature, key as keyof FeatureDetails[F]);
    };
  };

  const getFeatureProps = (feature: keyof FeatureDetails) => {
    return {
      setDetails: getFeatureUpdateDel(feature),
      initialDetails: featureData[feature],
    };
  };

  return [featureData, getFeatureProps] as [
    FeatureDetails,
    typeof getFeatureProps
  ];
};

export default useContractFeatureData;
