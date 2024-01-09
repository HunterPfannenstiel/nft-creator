'use client';

import { FormEvent, FunctionComponent } from 'react';
import classes from './VoucherCreationForm.module.css';
import useFormValidator from '@/lib/form-validator/useFormValidator';
import {
	getInitialInvalidFields,
	getVoucherFormCreationValidators,
} from '@/lib/form-validator/validator-functions';
import FieldInput from '../reusable/label-input/field-input';
import { VoucherCreationDetails } from '@/types/voucher';
import { concatClassNames } from '@/utils/css';
import { useFormState } from 'react-dom';
import { createVoucherFromForm } from '@/lib/voucher/voucher-creation';

interface VoucherCreationFormProps {
	creationObj: VoucherCreationDetails;
}

const VoucherCreationForm: FunctionComponent<VoucherCreationFormProps> = ({
	creationObj,
}) => {
	const tokenMetadata =
		creationObj.contractType === 'ERC1155' ? creationObj.tokenMetadata : '';
	const fieldValidators = getVoucherFormCreationValidators(creationObj);
	const initialInvalidFields = getInitialInvalidFields(creationObj);

	const { validForm, invalidFields, fieldChangedHandler } = useFormValidator(
		fieldValidators,
		initialInvalidFields
	);
	const [state, formAction] = useFormState(
		createVoucherFromForm.bind(null, '0xabcdef', creationObj),
		{ message: '' }
	);

	const OnInputFieldChange = (event: FormEvent<HTMLFormElement>) => {
		const { target } = event;
		if (target instanceof HTMLInputElement) {
			const valid = fieldChangedHandler(target.id, target.value);
			console.log(valid, target.value);
		}
	};

	const OnFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (event.target instanceof HTMLFormElement) {
			const formData = new FormData(event.target);
			formData.forEach((value, key, parent) => {
				console.log(key, value);
			});
			// send form data along w/ creationObj to server
		}
	};

	return (
		<form onChange={OnInputFieldChange} action={formAction}>
			<FieldInput
				labelText="Claimer Address"
				id="claimerAddress"
				name="claimerAddress"
				onChange={(val) => {}}
				className={concatClassNames(
					invalidFields.has('claimerAddress') ? classes.invalid : classes.valid,
					classes.input
				)}
			/>
			<FieldInput
				labelText="Token Metadata"
				id="metadata"
				name="metadata"
				onChange={(val) => {}}
				className={concatClassNames(
					invalidFields.has('metadata') ? classes.invalid : classes.valid,
					classes.input
				)}
				defaultValue={tokenMetadata}
				readOnly={!!tokenMetadata}
				required
			/>
			{creationObj.expirationAllowed && (
				<FieldInput
					labelText="Expiration Date"
					id="expiration"
					name="expiration"
					onChange={(val) => {}}
					className={concatClassNames(
						invalidFields.has('expiration') ? classes.invalid : classes.valid,
						classes.input
					)}
					type="date"
				/>
			)}
			{creationObj.contractType === 'ERC1155' && (
				<FieldInput
					labelText="Token Amount"
					id="tokenAmount"
					name="tokenAmount"
					onChange={(val) => {}}
					className={concatClassNames(
						invalidFields.has('tokenAmount') ? classes.invalid : classes.valid,
						classes.input
					)}
					type="number"
					min={1}
					step={1}
					required
				/>
			)}
			<button type="submit" disabled={!validForm}>
				Submit
			</button>
			{state.message && <p>{state.message}</p>}
		</form>
	);
};

export default VoucherCreationForm;
