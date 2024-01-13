import { promises as fs } from 'fs';
import { ContractDetails } from '@/types/contract-gen';
import { VoucherDetails } from '@/types/voucher';

export const getFileContracts = async () => {
	const contractsJson = await fs.readFile(
		'./lib/server/temp/db/contracts.json',
		'utf-8'
	);
	return JSON.parse(contractsJson) as ContractDetails[];
};

export const getFileVouchers = async () => {
	const vouchersJson = await fs.readFile(
		'./lib/server/temp/db/vouchers.json',
		'utf-8'
	);
	return JSON.parse(vouchersJson) as VoucherDetails[];
};

export const addVoucherToFile = async (voucher: VoucherDetails) => {
	const currentVouchers = await getFileVouchers();
	currentVouchers.push(voucher);
	try {
		await fs.writeFile(
			'./lib/server/temp/db/vouchers.json',
			JSON.stringify(currentVouchers, null, 2),
			'utf-8'
		);
		return true;
	} catch {
		return false;
	}
};
