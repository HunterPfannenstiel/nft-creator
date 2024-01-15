import { FunctionComponent } from 'react';
import classes from './Contract.module.css';
import { ContractDetails } from '@/types/contract-gen';

interface ContractProps {
	contract: ContractDetails;
}

const Contract: FunctionComponent<ContractProps> = ({ contract }) => {
	return (
		<div className={classes.container}>
			<h3>{contract.contractName}</h3>
			<p>Type: {contract.contractType}</p>
			<p>Owner: {contract.ownerAddress}</p>
		</div>
	);
};

export default Contract;
