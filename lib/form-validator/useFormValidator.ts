import { useEffect, useState } from 'react';
import { InputFieldValidators } from './types';

const useFormValidator = (
	inputFieldValidators: InputFieldValidators,
	initialInvalidFields: string[]
) => {
	const [validForm, setValidForm] = useState<boolean>(false);
	const [invalidFields, setInvalidFields] = useState<Set<string>>(
		new Set(initialInvalidFields)
	);

	useEffect(() => {
		const formIsValid = invalidFields.size === 0;
		if (formIsValid !== validForm) setValidForm(formIsValid);
	}, [invalidFields]);

	const fieldChangedHandler = (fieldName: string, fieldValue: string) => {
		let validInputValue = fieldValue !== '';

		if (fieldName in inputFieldValidators) {
			validInputValue = inputFieldValidators[fieldName](fieldValue);
		} else {
			console.log(
				`The input '${fieldName}' doesn't have an associated validator function`
			);
			if ('fallback' in inputFieldValidators) {
				validInputValue = inputFieldValidators['fallback'](fieldValue);
				console.log('Using fallback validator for ' + fieldName);
			}
		}

		let setChanged = false;
		if (validInputValue) setChanged = invalidFields.delete(fieldName);
		else {
			const prevSize = invalidFields.size;
			invalidFields.add(fieldName);
			setChanged = invalidFields.size !== prevSize;
		}

		if (setChanged) setInvalidFields(new Set(invalidFields));
		return validInputValue;
	};

	const fieldRemoved = (fieldName: string) => {
		if (invalidFields.delete(fieldName)) {
			setInvalidFields(new Set(invalidFields));
		}
	};

	return {
		validForm,
		invalidFields,
		fieldChangedHandler,
		fieldRemoved,
	};
};

export default useFormValidator;
