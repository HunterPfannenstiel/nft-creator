import { FunctionComponent, Suspense } from 'react';
import classes from './CreateVoucherPage.module.css';
import { getVoucherFormCreationValidators } from '@/lib/form-validator/validator-functions';

interface CreateVoucherPageProps {
	params: { contractAddress: string };
}

// retrieve

const GetJSX = async ({ contractAddress }: { contractAddress: string }) => {
	const contractType = 'ERC721'; // fetch actual contract type w/ address, will also get additional info (like allowsExpiration)

	const creationObj: VoucherCreationDetails = {
		contractAddress,
		contractType,
		allowsExpiration: false,
	};

	const validators = getVoucherFormCreationValidators(creationObj);

	if (contractType === 'ERC721') {
		return <p>Render Voucher Creation form w/ ERC721 specifics</p>;
	} else {
		return <p>Render Voucher Creation form w/ ERC1155 specifics</p>;
	}
};

const CreateVoucherPage: FunctionComponent<CreateVoucherPageProps> = ({
	params,
}) => {
	return (
		<div>
			<h1>{params.contractAddress}</h1>
			<Suspense fallback={<p>Waiting...</p>}>
				<GetJSX contractAddress={params.contractAddress} />
			</Suspense>
		</div>
	);
};

export default CreateVoucherPage;
