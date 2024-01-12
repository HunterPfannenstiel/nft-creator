import { FunctionComponent, Suspense } from 'react';
import classes from './CreateVoucherPage.module.css';
import { ERC1155IVD, ERC721IVD, VoucherCreationDetails } from '@/types/voucher';
import VoucherCreationForm from '@/components/ui/voucher/creation/VoucherCreationForm';

interface CreateVoucherPageProps {
	params: { contractAddress: string };
}

const GetJSX = async ({ contractAddress }: { contractAddress: string }) => {
	const creationObj = new ERC721IVD(contractAddress, false); // this should be fetched as an InitialVoucherDetails obj
	return <VoucherCreationForm creationObj={creationObj.toJson()} />;
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
