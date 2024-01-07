import { ContractType } from '@/components/ui/contract-gen/types';

export type VoucherCreationDetails = {
	contractType: 'ERC721' | 'ERC1155'; // change to 'ContractType' when type is created
	contractAddress: string;
	allowsExpiration: boolean;
} & (
	| {
			contractType: 'ERC721';
	  }
	| {
			contractType: 'ERC1155';
			tokenId?: number;
			tokenMetadata?: string;
	  }
);

export abstract class InitialVoucherDetails {
	constructor(
		public contractAddress: string,
		public contractType: ContractType,
		public expirationAllowed: boolean
	) {}
}

export class ERC721IVD extends InitialVoucherDetails {
	constructor(contractAddress: string, expirationAllowed: boolean) {
		super(contractAddress, 'ERC721', expirationAllowed);
	}
}

export class ERC1155IVD extends InitialVoucherDetails {
	constructor(
		contractAddress: string,
		expirationAllowed: boolean,
		public tokenMetadata?: string,
		public tokenId?: number
	) {
		super(contractAddress, 'ERC1155', expirationAllowed);
	}
}
