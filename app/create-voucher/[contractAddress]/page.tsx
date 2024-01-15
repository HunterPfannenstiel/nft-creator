import { FunctionComponent, Suspense } from 'react';
import classes from './CreateVoucherPage.module.css';
import { ERC1155IVD, ERC721IVD, VoucherCreationDetails } from '@/types/voucher';
import VoucherCreationForm from '@/components/ui/voucher/creation/VoucherCreationForm';
import { fileContractExists } from '@/lib/server/temp/db/file-contents-helpers';

interface CreateVoucherPageProps {
	params: { contractAddress: string };
}

const GetJSX = async ({ contractAddress }: { contractAddress: string }) => {
	const contractExists = await fileContractExists(contractAddress);
	if (contractExists) {
		const creationObj = new ERC721IVD(contractAddress, false); // this should be fetched as an InitialVoucherDetails obj
		return <VoucherCreationForm creationObj={creationObj.toJson()} />;
	} else {
		return (
			<p>
				A contract does not exist with address &apos;{contractAddress}&apos; :(
			</p>
		);
	}
};

const CreateVoucherPage: FunctionComponent<CreateVoucherPageProps> = ({
	params,
}) => {
	const { contractAddress } = params;

	return (
		<div>
			<h1>{contractAddress}</h1>
			<Suspense fallback={<p>Waiting...</p>}>
				<GetJSX contractAddress={contractAddress} />
			</Suspense>
		</div>
	);
};

export default CreateVoucherPage;
