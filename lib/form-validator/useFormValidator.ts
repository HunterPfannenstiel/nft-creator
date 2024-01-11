import { useState } from 'react';
import { InputFieldValidators } from './types';

const useFormValidator = (
	inputFieldValidators: InputFieldValidators,
	initialInvalidFields: string[]
) => {
	const [validForm, setValidForm] = useState<boolean>(false);
	const [invalidFields, setInvalidFields] = useState<Set<string>>(
		new Set(initialInvalidFields)
	);

	const fieldChangedHandler = (fieldName: string, fieldValue: string) => {
		let validInputValue = fieldValue == '';

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

		if (validInputValue) invalidFields.delete(fieldName);
		else invalidFields.add(fieldName);

		if (invalidFields.size === 0) setValidForm(true);
		else setValidForm(false);

		setInvalidFields(new Set(invalidFields));
		return validInputValue;
	};

	return {
		validForm,
		invalidFields,
		fieldChangedHandler,
	};
};

export default useFormValidator;
