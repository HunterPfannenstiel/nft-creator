import { FunctionComponent } from 'react';
import FieldInput from '../reusable/label-input/field-input';
import { concatClassNames } from '@/utils/css';
import { ERC721IVD } from '@/types/voucher';

interface ERC721FormInputsProps {
	creationObj: ERC721IVD;
	invalidFields: Set<string>;
	validClassName: string;
	invalidClassName: string;
	className?: string;
}

const ERC721FormInputs: FunctionComponent<ERC721FormInputsProps> = ({
	creationObj,
	invalidFields,
	invalidClassName,
	validClassName,
	className,
}) => {
	return (
		<>
			<FieldInput
				labelText="Claimer Address"
				id="claimerAddress"
				name="claimerAddress"
				onChange={(val) => {}}
				className={concatClassNames(
					invalidFields.has('claimerAddress')
						? invalidClassName
						: validClassName,
					className
				)}
			/>
			<FieldInput
				labelText="Token Metadata"
				id="metadata"
				name="metadata"
				onChange={(val) => {}}
				className={concatClassNames(
					invalidFields.has('metadata') ? invalidClassName : validClassName,
					className
				)}
			/>
		</>
	);
};

export default ERC721FormInputs;
