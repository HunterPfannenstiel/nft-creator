'use server';
import { VoucherFilter } from '@/types/voucher';
import { getFileVouchers } from './temp/db/file-contents-helpers';

// make sure code runs on the server

export const getUserVouchers = async (
	user: string,
	voucherFilter: VoucherFilter
) => {
	// Read from db or blockchain
	await new Promise((resolve, reject) => setTimeout(() => resolve(''), 1000)); // simulate fetching
	const vouchers = await getFileVouchers();
	return vouchers.filter((voucher) =>
		voucherFilter === 'created'
			? voucher.creatorAddress === user
			: voucher.claimerAddress === user
	);

	/* const vouchers: VoucherDetails[] = [
		{
			contractAddress: '0xabcdef',
			contractType: 'ERC721',
			contractName: "Mike W's Amazing Creations",
			creatorAddress: user,
			claimerAddress: '0xaaaaa',
			metadataURL: 'https://some-pinata-link.com',
			imageURL:
				'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Mike_Wazowski.png/220px-Mike_Wazowski.png',
			redeemed: voucherFilter === 'claimed',
		},
		{
			contractAddress: '0xabcdef',
			contractType: 'ERC721',
			contractName: "Mike W's Amazing Creations",
			creatorAddress: user,
			claimerAddress: '0xaaaaa',
			metadataURL: 'https://some-pinata-link.com',
			imageURL:
				'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Mike_Wazowski.png/220px-Mike_Wazowski.png',
			redeemed: voucherFilter === 'claimed',
		},
		{
			contractAddress: '0xabcdef',
			contractType: 'ERC721',
			contractName: "Mike W's Amazing Creations",
			creatorAddress: user,
			claimerAddress: '0xaaaaa',
			metadataURL: 'https://some-pinata-link.com',
			imageURL:
				'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Mike_Wazowski.png/220px-Mike_Wazowski.png',
			redeemed: voucherFilter === 'claimed',
		},
	]; */
};
