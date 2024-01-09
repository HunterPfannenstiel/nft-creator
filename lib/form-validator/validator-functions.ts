import {
	ERC1155IVD,
	InitialVoucherDetails,
	VoucherCreationDetails,
} from '@/types/voucher';
import { InputFieldValidators } from './types';

export const validateEthereumAddress = (address: string) => {
	return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateIntegerInput = (numberString: string) => {
	if (numberString === '') return false;
	if (isNaN(+numberString)) return false; // if numberString is not a number after conversion attempt, return false
	return !numberString.includes('.'); // if numberString contains a decimal, it's not a valid integer
};

export const validateUrl = (url: string) => {
	return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
		url
	); // url matching regex, potentially better regex elsewhere
};

export const validateDate = (date: string) => {
	return true;
};

export const getVoucherFormCreationValidators = (
	creationObj: VoucherCreationDetails
) => {
	const validators: InputFieldValidators = {
		claimerAddress: validateEthereumAddress,
		metadata: validateUrl,
	};

	if (creationObj.expirationAllowed) validators.expiration = validateDate;
	if (creationObj.contractType === 'ERC1155') {
		validators.tokenAmount = validateIntegerInput;
		if ('tokenId' in creationObj) {
			validators.tokenId = validateIntegerInput;
			validators.metadata = validateUrl;
		}
	}

	return validators;
};

export const getInitialInvalidFields = (
	creationObj: VoucherCreationDetails
) => {
	const initialInvalidFields = ['claimerAddress'];

	if (creationObj.contractType === 'ERC721') {
		initialInvalidFields.push('metadata');
	} else if (creationObj.contractType === 'ERC1155') {
		initialInvalidFields.push('tokenAmount');
		if (!creationObj.tokenMetadata) initialInvalidFields.push('metadata');
	}

	return initialInvalidFields;
};
