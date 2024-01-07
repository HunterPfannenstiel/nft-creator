import { FunctionComponent, Suspense } from 'react';
import classes from './CreateVoucherPage.module.css';
import { getVoucherFormCreationValidators } from '@/lib/form-validator/validator-functions';
import VoucherCreationForm from '@/components/ui/voucher-creation/VoucherCreationForm';
import { ERC721IVD, VoucherCreationDetails } from '@/types/voucher';

interface CreateVoucherPageProps {
	params: { contractAddress: string };
}

const GetJSX = async ({ contractAddress }: { contractAddress: string }) => {
	const creationObj = new ERC721IVD(contractAddress, true); // this should be fetched as an InitialVoucherDetails obj

	return <VoucherCreationForm creationObj={creationObj} />;
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
