import { ContractType } from '@/components/ui/contract-gen/types';

export type VoucherCreationDetails = {
	contractType: 'ERC721' | 'ERC1155'; // change to 'ContractType' when type is created
	contractAddress: string;
	expirationAllowed: boolean;
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
		public readonly contractAddress: string,
		public readonly contractType: ContractType,
		public readonly expirationAllowed: boolean
	) {}

	public toJson() {
		return {
			contractAddress: this.contractAddress,
			contractType: this.contractType,
			expirationAllowed: this.expirationAllowed,
		};
	}
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
		public readonly tokenMetadata?: string,
		public readonly tokenId?: number
	) {
		super(contractAddress, 'ERC1155', expirationAllowed);
	}

	public toJson() {
		return {
			...super.toJson(),
			tokenMetadata: this.tokenMetadata,
			tokenId: this.tokenId,
		};
	}
}
