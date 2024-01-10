import { ContractType } from '@/components/ui/contract-gen/types';

export type ContractDetails = {
	contractAddress: string;
	contractType: ContractType;
	ownerAddress: string;
	numTokens: number;
};
