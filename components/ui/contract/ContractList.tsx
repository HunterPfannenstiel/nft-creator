import { FunctionComponent } from 'react';
import classes from './ContractList.module.css';
import { ContractDetails } from '@/types/contract-gen';
import Contract from './Contract';

interface ContractListProps {
	contracts: ContractDetails[];
}

const ContractList: FunctionComponent<ContractListProps> = ({ contracts }) => {
	return (
		<ul className={classes.contract_list}>
			{contracts.map((contract) => (
				<li key={contract.contractName}>
					<Contract contract={contract} />
				</li>
			))}
		</ul>
	);
};

export default ContractList;
