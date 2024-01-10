'use server';
import { ContractDetails } from '@/types/contract-gen';

// make sure code is ran on the server

export const getUserContracts = async (user: string) => {
	// Read from db or blockchain
	await new Promise((resolve, reject) => setTimeout(() => resolve(''), 1000)); // simulate fetching

	const contracts: ContractDetails[] = [
		{
			contractAddress: '0xabcdef',
			contractType: 'ERC1155',
			ownerAddress: user,
			numTokens: 5,
		},
		{
			contractAddress: '0x012345',
			contractType: 'ERC721',
			ownerAddress: user,
			numTokens: 12,
		},
		{
			contractAddress: '0xaaaaaa',
			contractType: 'ERC721',
			ownerAddress: user,
			numTokens: 99,
		},
	];
	return contracts;
};
