"use client";

import ContractGeneratorForm from "@/components/ui/contract-gen/contract-generator-form";
import VoucherDetails from "@/components/ui/contract-gen/forms/features/voucher-details";
import { FeatureInfo } from "@/components/ui/contract-gen/types";

const featureOptions: FeatureInfo = {
  airdrop: { label: "Airdrop" },
  voucher: { component: VoucherDetails, label: "Voucher" },
};

const GenerateContractPage = () => {
  return <ContractGeneratorForm featureInfo={featureOptions} />;
};

export default GenerateContractPage;
