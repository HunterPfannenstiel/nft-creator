'use server'; // Make sure code is ran on the server

import { VoucherCreationDetails, VoucherDetails } from '@/types/voucher';
import {
	validateDate,
	validateEthereumAddress,
	validateIntegerInput,
	validateUrl,
} from '../form-validator/validator-functions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
	addVoucherToFile,
	getFileVouchers,
} from '../server/temp/db/file-contents-helpers';

const extractAttributes = (
	formData: FormData,
	nonAttributeFields: Set<string>
) => {
	const attributes: { [attributeName: string]: string } = {};
	formData.forEach((value, key) => {
		if (!nonAttributeFields.has(key)) attributes[key] = value.toString();
	});
	return attributes;
};

// This method should be used when submitting the voucher form using a server action with the 'useFormState' hook.
export const createVoucherFromForm = async (
	creatorAddress: string,
	creationObj: VoucherCreationDetails,
	prevState: { message: string }, // The reason why the previous form was invalid
	formData: FormData // The current form data
) => {
	/* if (!validateEthereumAddress(creatorAddress)) {
		return {
			message: "Creator's address is invalid",
		};
	} */

	const { contractAddress, contractType, expirationAllowed } = creationObj;

	let expirationDate: string = '';
	if (expirationAllowed) {
		expirationDate = formData.get('expirationDate')?.toString() || '';
		if (expirationDate && !validateDate(expirationDate)) {
			return {
				message: 'Expiration date invalid',
			};
		}
	}

	const claimerAddress = formData.get('claimerAddress')?.toString();
	if (!claimerAddress || !validateEthereumAddress(claimerAddress)) {
		return {
			message: 'Claimer address invalid',
		};
	}

	// At this point, loop through formData looking for items that are not required -> these are the attributes

	if (contractType === 'ERC721') {
		// Get token image and attributes -> create metadata URL
		// Send a database call to add voucher
		const nonAttributeFields = new Set([
			'claimerAddress',
			'expiration',
			'tokenImage',
			'tokenAmount',
		]);
		const attributes = extractAttributes(formData, nonAttributeFields);
		console.log({ attributes });
	} else if (contractType === 'ERC1155') {
		const tokenAmount = formData.get('tokenAmount')?.toString();
		if (!tokenAmount || !validateIntegerInput(tokenAmount)) {
			return {
				message: 'A token amount was not provided or was invalid',
			};
		}

		const tokenId =
			creationObj.tokenId !== undefined ? creationObj.tokenId : -1;
		if (tokenId === -1) {
			// Get token image and metadata -> get metadata URL
			const nonAttributeFields = new Set([
				'claimerAddress',
				'expiration',
				'tokenImage',
				'tokenAmount',
			]);
			const attributes = extractAttributes(formData, nonAttributeFields);
		} else {
			// There's no need for metadata if the token already exists
		}

		// Send database call to add voucher
	}

	const newVoucher: VoucherDetails = {
		claimerAddress,
		contractAddress,
		creatorAddress,
		contractType,
		metadataURL: 'https://get-metadata.com',
		imageURL:
			'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Mike_Wazowski.png/220px-Mike_Wazowski.png',
		redeemed: false,
		contractName: "Mike W's Amazing Creations",
	};
	const success = await addVoucherToFile(newVoucher);

	if (!success) {
		return {
			message: 'There was an issue creating your voucher',
		};
	} else {
		// revalidatePath('/create-voucher'); // Revalidate the path because new voucher would've been added
		redirect(`/dashboard/${creatorAddress}/vouchers`); // Send them to their voucher-created page when it's a thing
	}
};
