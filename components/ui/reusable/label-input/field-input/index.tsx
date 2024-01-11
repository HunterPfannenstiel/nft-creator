import { ComponentPropsWithRef, FunctionComponent, RefObject } from 'react';
import { Layout } from '../types';
import LabelInput from '..';

export type FieldInputProps = {
	labelText?: string;
	layout?: Layout;
	gap?: string;
	labelClassName?: string;
	innerRef?: RefObject<HTMLInputElement>;
	onChange: (inputValue: string) => void;
} & Omit<ComponentPropsWithRef<'input'>, 'onChange'>;

const FieldInput: FunctionComponent<FieldInputProps> = ({
	labelText,
	layout,
	gap,
	labelClassName,
	onChange,
	innerRef,
	...inputProps
}) => {
	return (
		<LabelInput
			labelText={labelText}
			layout={layout}
			gap={gap}
			labelClassName={labelClassName}
			inputId={inputProps.id}
			inputComponent={
				<input
					{...inputProps}
					onChange={(e) => {
						onChange(e.target.value);
					}}
					ref={innerRef}
				/>
			}
		/>
	);
};

export default FieldInput;
