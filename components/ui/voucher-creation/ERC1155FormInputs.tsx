import { FunctionComponent } from 'react';
import FieldInput from '../reusable/label-input/field-input';
import { concatClassNames } from '@/utils/css';
import { ERC1155IVD, VoucherCreationDetails } from '@/types/voucher';

interface ERC1155FormInputsProps {
	creationObj: ERC1155IVD;
	invalidFields: Set<string>;
	validClassName: string;
	invalidClassName: string;
	className?: string;
}

const ERC1155FormInputs: FunctionComponent<ERC1155FormInputsProps> = ({
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
				required
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
				defaultValue={creationObj.tokenMetadata || ''}
				readOnly={'tokenMetadata' in creationObj}
				required
			/>
			<FieldInput
				labelText="Token Amount"
				id="tokenAmount"
				name="tokenAmount"
				onChange={(val) => {}}
				className={concatClassNames(
					invalidFields.has('tokenAmount') ? invalidClassName : validClassName,
					className
				)}
				type="number"
				min={1}
				step={1}
				defaultValue={1}
				required
			/>
		</>
	);
};

export default ERC1155FormInputs;
