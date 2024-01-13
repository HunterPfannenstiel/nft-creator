'use client';

import { FunctionComponent, useRef, useState } from 'react';
import classes from './DynamicInputs.module.css';
import FieldInput, { FieldInputProps } from '../label-input/field-input';

interface DynamicInputsProps extends FieldInputProps {
	inputModifiedCallback?: (inputName: string, added: boolean) => void;
	predefinedInputs?: string[];
	renderInput?: (inputName: string, inputJsx: JSX.Element) => JSX.Element;
}

const DynamicInputs: FunctionComponent<DynamicInputsProps> = ({
	inputModifiedCallback,
	predefinedInputs,
	renderInput = (_, inputJsx) => inputJsx,
	...inputProps
}) => {
	const [dynamicInputs, setDynamicInputs] = useState<string[]>([]);
	const [addingInput, setAddingInput] = useState<boolean>(false);

	const currentInputsSet = useRef<Set<string>>(new Set(predefinedInputs));
	const newInputNameRef = useRef<HTMLInputElement>(null);

	const OnModifyInputs = (inputName: string, add: boolean) => {
		const set = currentInputsSet.current;
		if (add) {
			if (set.has(inputName)) {
				console.log(
					`Unable to add input '${inputName}', it's already an input`
				);
				return;
			}

			set.add(inputName);
			setDynamicInputs((prev) => [...prev, inputName]);
			setAddingInput(false);
		} else {
			if (!set.has(inputName)) {
				console.log(`Unable to remove input '${inputName}'; it doesn't exist`);
				return;
			}

			set.delete(inputName);
			setDynamicInputs((prev) => prev.filter((name) => name !== inputName));
		}

		if (inputModifiedCallback) inputModifiedCallback(inputName, add);
	};

	return (
		<>
			{dynamicInputs.map((inputName) =>
				renderInput(
					inputName,
					<>
						<FieldInput
							key={inputName}
							id={inputName}
							name={inputName}
							labelText={inputName}
							{...inputProps}
						/>
						<button
							type="button"
							onClick={OnModifyInputs.bind(this, inputName, false)}
						>
							x
						</button>
					</>
				)
			)}
			{addingInput && (
				<>
					<FieldInput
						innerRef={newInputNameRef}
						onChange={() => {}}
						labelText="New input name:"
					/>
					<button
						onClick={() => OnModifyInputs(newInputNameRef.current!.value, true)}
						type="button"
					>
						Add
					</button>
				</>
			)}
			<button
				disabled={addingInput}
				type="button"
				onClick={setAddingInput.bind(this, true)}
			>
				Add Field
			</button>
		</>
	);
};

export default DynamicInputs;
