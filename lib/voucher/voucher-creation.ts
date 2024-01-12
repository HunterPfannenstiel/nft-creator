'use server'; // Make sure code is ran on the server

import { VoucherCreationDetails } from '@/types/voucher';
import {
	validateDate,
	validateEthereumAddress,
	validateIntegerInput,
	validateUrl,
} from '../form-validator/validator-functions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// This method should be used when submitting the voucher form using a server action with the 'useFormState' hook.
export const createVoucherFromForm = async (
	creatorAddress: string,
	creationObj: VoucherCreationDetails,
	prevState: { message: string }, // The reason why the previous form was invalid
	formData: FormData // The current form data
) => {
	console.log({ creationObj, prevState });
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

	/* 	const metadata = formData.get('metadata')?.toString();
	if (!metadata || !validateUrl(metadata)) {
		return {
			message: 'Metadata invalid',
		};
	} */

	const claimerAddress = formData.get('claimerAddress')?.toString();
	if (!claimerAddress || !validateEthereumAddress(claimerAddress)) {
		return {
			message: 'Claimer address invalid',
		};
	}

	console.log({ claimerAddress });

	// At this point, loop through formData looking for items that are not required -> these are the attributes

	if (contractType === 'ERC721') {
		// Get token image and attributes -> create metadata URL
		// Send a database call to add voucher
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
		} else {
			// There's no need for metadata if the token already exists
		}

		// Send database call to add voucher
	}

	// revalidatePath('/create-voucher'); // Revalidate the path because new voucher would've been added
	redirect('/create-voucher'); // Send them to their voucher-created page when it's a thing
};
