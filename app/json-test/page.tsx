'use client';

import { ChangeEvent, FunctionComponent } from 'react';
import classes from './JsonTestPage.module.css';
import DynamicInputs from '@/components/ui/reusable/dynamic-inputs/DynamicInputs';

interface JsonTestPageProps {}

const JsonTestPage: FunctionComponent<JsonTestPageProps> = () => {
	const ParseJson = (jsonString: string | ArrayBuffer | null) => {
		console.log(jsonString);
		if (typeof jsonString !== 'string') return; // Show parsing error

		let json = JSON.parse(jsonString);
		if (Array.isArray(json)) {
			if (json.length === 0) return; // Nothing to parse, could reset fields and/or throw an error
			json = json[0];
		}
		Object.keys(json).map((key) => {
			console.log({ key, value: json[key] });
			if (typeof json[key] !== 'string' && typeof json[key] !== 'number') {
				console.log('Invalid value type for key ' + key);
			}
			// Set input field to correct values if an input is associated w/ key
		});
	};

	const OnFileChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.target;
		if (!input.files) return;

		const file = input.files[0];
		const fileReader = new FileReader();
		fileReader.onload = () => ParseJson(fileReader.result);
		fileReader.readAsText(file);
	};

	return (
		<form>
			<input
				type="file"
				accept=".json, application/json"
				onChange={OnFileChanged}
			/>
			<DynamicInputs onChange={() => {}} />
		</form>
	);
};

export default JsonTestPage;
