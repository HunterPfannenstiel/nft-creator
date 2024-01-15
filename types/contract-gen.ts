import { ContractType } from '@/components/ui/contract-gen/types';

export type ContractDetails = {
	contractAddress: string;
	contractType: ContractType;
	contractName: string;
	ownerAddress: string;
	numTokens: number;
};
