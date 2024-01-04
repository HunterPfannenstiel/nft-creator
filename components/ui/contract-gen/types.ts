import { FormData } from "@/lib/form-data/types";
import { InputImage } from "@/types";
import { FunctionComponent, ReactElement } from "react";

export type CollectionDetails = {
  name?: string;
  summary?: string;
  image?: string | { imageUrl: string; blob: Blob };
};

export type FormUpdateDel<T> = <U extends keyof T>(key: U, value: T[U]) => void;

export type ContractType = "ERC721" | "ERC1155";

export type FeatureSelections = FormData<boolean>;

export type ContractData = {
  contractType?: ContractType;
  collectionDetails?: CollectionDetails;
  contractFeatures?: FeatureSelections;
};

//Feature Types

export type AirdropDetails = {};

//Voucher Details
export type VoucherDetails = {
  name: string;
  image: string;
};

type VoucherInputDetails = {
  name?: string;
  image?: InputImage;
};

export type FeatureDetails = {
  airdrop?: AirdropDetails;
  voucher?: VoucherInputDetails;
};

export type ContractFeature = keyof NonNullable<FeatureDetails>;

export type FeatureInfo = {
  [Feature in ContractFeature]: {
    component?: ContractFeatureInput<Feature>;
    label: string;
  };
};

type ContractFeatureInputProps<F extends ContractFeature> = {
  setDetails: FormUpdateDel<NonNullable<FeatureDetails[F]>>;
  initialDetails?: FeatureDetails[F];
  setValidity: (validity: boolean) => void;
};

export type ContractFeatureInput<
  F extends keyof FeatureDetails,
  Props = {}
> = FunctionComponent<ContractFeatureInputProps<F> & Props> & { feature: F };
