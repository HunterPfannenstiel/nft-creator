type VoucherCreationDetails = {
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
