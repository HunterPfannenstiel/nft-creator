'use client';

import { FormEvent, FunctionComponent } from 'react';
import classes from './VoucherCreationForm.module.css';
import useFormValidator from '@/lib/form-validator/useFormValidator';
import {
	getInitialInvalidFields,
	getVoucherFormCreationValidators,
} from '@/lib/form-validator/validator-functions';
import FieldInput from '../../reusable/label-input/field-input';
import { VoucherCreationDetails } from '@/types/voucher';
import { concatClassNames } from '@/utils/css';
import { useFormState } from 'react-dom';
import { createVoucherFromForm } from '@/lib/voucher/voucher-creation';
import DynamicInputs from '../../reusable/dynamic-inputs/DynamicInputs';

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

	const { validForm, invalidFields, fieldChangedHandler, fieldRemoved } =
		useFormValidator(fieldValidators, initialInvalidFields);
	const [state, formAction] = useFormState(
		createVoucherFromForm.bind(null, '0xabcdef', creationObj),
		{ message: '' }
	);

	const OnInputFieldChange = (event: FormEvent<HTMLFormElement>) => {
		const { target } = event;
		if (target instanceof HTMLInputElement) {
			if (!target.id) return;
			const valid = fieldChangedHandler(target.id, target.value);
			console.log(valid, target.value);
		}
	};

	const AttributeFieldModified = (inputName: string, added: boolean) => {
		if (!added) fieldRemoved(inputName);
		else fieldChangedHandler(inputName, '');
	};

	return (
		<form
			onChange={OnInputFieldChange}
			action={formAction}
			className={classes.form}
		>
			<h2>Required Fields: </h2>
			<FieldInput
				labelText="Claimer Address"
				id="claimerAddress"
				name="claimerAddress"
				onChange={(val) => {}}
				className={concatClassNames(
					invalidFields.has('claimerAddress') ? classes.invalid : classes.valid
				)}
				containerClassName={classes.input}
			/>
			{creationObj.expirationAllowed && (
				<FieldInput
					labelText="Expiration Date"
					id="expiration"
					name="expiration"
					onChange={(val) => {}}
					className={concatClassNames(
						invalidFields.has('expiration') ? classes.invalid : classes.valid
					)}
					containerClassName={classes.input}
					type="date"
				/>
			)}
			{!tokenMetadata && (
				<FieldInput
					labelText="Token Image"
					id="tokenImage"
					name="tokenImage"
					type="file"
					accept=".png, .jpeg, image/png, image/jpeg"
					onChange={(val) => {}}
					className={concatClassNames(
						invalidFields.has('tokenImage') ? classes.invalid : classes.valid
					)}
					containerClassName={classes.input}
				/>
			)}
			{creationObj.contractType === 'ERC1155' && (
				<FieldInput
					labelText="Token Amount"
					id="tokenAmount"
					name="tokenAmount"
					onChange={(val) => {}}
					className={concatClassNames(
						invalidFields.has('tokenAmount') ? classes.invalid : classes.valid
					)}
					containerClassName={classes.input}
					type="number"
					min={1}
					step={1}
					required
				/>
			)}
			<h2>Token Attributes: </h2>
			<DynamicInputs
				predefinedInputs={[
					'Claimer Address',
					'Expiration Date',
					'Token Image',
					'Token Amount',
				]}
				onChange={() => {}}
				inputModifiedCallback={AttributeFieldModified}
				renderInput={(inputName, inputJsx) => (
					<div
						className={concatClassNames(
							invalidFields.has(inputName) ? classes.invalid : classes.valid,
							classes.dynamic_input
						)}
						key={inputName}
					>
						{inputJsx}
					</div>
				)}
			/>
			<button type="submit" disabled={!validForm}>
				Submit
			</button>
			{state.message && <p>{state.message}</p>}
		</form>
	);
};

export default VoucherCreationForm;

{
	/* <FieldInput
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
			/> */
}
