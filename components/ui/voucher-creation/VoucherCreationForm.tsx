'use client';

import { ChangeEvent, FormEvent, FunctionComponent } from 'react';
import classes from './VoucherCreationForm.module.css';
import useFormValidator from '@/lib/form-validator/useFormValidator';
import { getVoucherFormCreationValidators } from '@/lib/form-validator/validator-functions';
import FieldInput from '../reusable/label-input/field-input';
import ERC721FormInputs from './ERC721FormInputs';
import ERC1155FormInputs from './ERC1155FormInputs';
import { InitialVoucherDetails, VoucherCreationDetails } from '@/types/voucher';

interface VoucherCreationFormProps {
	creationObj: InitialVoucherDetails;
}

const VoucherCreationForm: FunctionComponent<VoucherCreationFormProps> = ({
	creationObj,
}) => {
	const fieldValidators = getVoucherFormCreationValidators(creationObj);
	const { validForm, invalidFields, fieldChangedHandler } = useFormValidator(
		fieldValidators,
		['claimerAddress', 'metadata', 'tokenAmount']
	); // all fields will be invalid first, need to change later

	const OnInputFieldChange = (event: FormEvent<HTMLFormElement>) => {
		const { target } = event;
		if (target instanceof HTMLInputElement) {
			const valid = fieldChangedHandler(target.id, target.value);
			console.log(valid, target.value);
		}
	};

	const OnFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	if (creationObj.contractType === 'ERC721') {
		return (
			<form onChange={OnInputFieldChange} onSubmit={OnFormSubmit}>
				<ERC721FormInputs
					creationObj={creationObj}
					invalidFields={invalidFields}
					invalidClassName={classes.invalid}
					validClassName={classes.valid}
				/>
				<button type="submit" disabled={!validForm}>
					Submit
				</button>
			</form>
		);
	} else if (creationObj.contractType === 'ERC1155') {
		return (
			<form onChange={OnInputFieldChange} onSubmit={OnFormSubmit}>
				<ERC1155FormInputs
					creationObj={creationObj}
					invalidFields={invalidFields}
					invalidClassName={classes.invalid}
					validClassName={classes.valid}
				/>
				<button type="submit" disabled={!validForm}>
					Submit
				</button>
			</form>
		);
	} else {
		return <p>Contract type not supported</p>;
	}
};

export default VoucherCreationForm;
