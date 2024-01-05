import useFormData from "@/lib/form-data/useFormData";
import {
  CollectionDetails,
  ContractData,
  FeatureSelections,
  ContractType,
  FormUpdateDel,
  FeatureDetails,
  ContractFeature,
} from "../types";
import useContractFeatureData from "./useContractFeatureData";

//TODO: Fix useFormData type

const useContractFormData = (
  initialData?: ContractData,
  intitalFeatureDetails?: FeatureDetails
) => {
  const [contractData, setContractData] = useFormData<ContractData>(
    getInitialData(initialData)
  );

  const [featureDetails, getFeatureDetailProps] = useContractFeatureData(
    intitalFeatureDetails
  );

  const setContractType = (type: ContractType) => {
    setContractData(type, "contractType");
  };

  const getTypeProps = () => {
    return {
      setType: setContractType,
      selectedType: contractData.contractType,
    };
  };

  const setCollectionDetails: FormUpdateDel<CollectionDetails> = (
    key,
    value
  ) => {
    setContractData(value, "collectionDetails", key);
  };

  const getDetailProps = () => {
    return {
      setDetails: setCollectionDetails,
      details: contractData.collectionDetails,
    };
  };

  const setContractFeatures: FormUpdateDel<FeatureSelections> = (
    key,
    value
  ) => {
    setContractData(value, "contractFeatures", key);
  };

  const getFeatureProps = () => {
    return {
      setFeature: setContractFeatures,
      selectedFeatures: contractData.contractFeatures,
    };
  };

  const getSelectedFeatures = (): Array<ContractFeature> => {
    const { contractFeatures } = contractData;
    if (contractFeatures) {
      const features = Object.keys(contractFeatures) as ContractFeature[]; //Features marked as true (and not false)
      return features.filter((feature) => contractFeatures[feature]);
    }
    return [];
  };

  return {
    contractData,
    getTypeProps,
    getDetailProps,
    getFeatureProps,
    featureDetails,
    getFeatureDetailProps,
    getSelectedFeatures,
  };
};

export default useContractFormData;

const getInitialData = (initialData?: ContractData): ContractData => {
  if (initialData) return initialData;
  return {
    contractType: undefined,
    collectionDetails: {},
    contractFeatures: {},
  };
};
