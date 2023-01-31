import { useState, useEffect } from 'react';
import { createContext } from 'react';
import {
	IFileItem,
	IFormFields,
	IUploadFile,
	_initialFormFields,
	_initialUploadFile,
} from './interfaces';
import * as config from './config';
import axios from 'axios';

interface IAppContext {
	appTitle: string;
	uploadFile: IUploadFile;
	setUploadFile: (file: IUploadFile) => void;
	formFields: IFormFields;
	setFormFields: (field: IFormFields) => void;
	fileItems: IFileItem[];
	setFileItems: (items: IFileItem[]) => void;
	fetchFileItems: () => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, titleField: any) => void; 
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [uploadFile, setUploadFile] = useState<IUploadFile>({
		..._initialUploadFile,
	});
	const [formFields, setFormFields] = useState<IFormFields>({
		..._initialFormFields,
	});
	const [fileItems, setFileItems] = useState<IFileItem[]>([]);
	const appTitle = 'File Uploader';

	useEffect(() => {
		fetchFileItems();
	}, []);

	const fetchFileItems = () => {
		(async () => {
			setFileItems(
				(await axios.get(`${config.backendUrl}/fileitems`)).data
			);
		})();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, titleField: React.RefObject<HTMLInputElement>) => {
		e.preventDefault();
		if (uploadFile.file && formFields.title.trim() !== '') {
			let formData = new FormData();
			formData.append('file', uploadFile.file);
			formData.append('title', formFields.title);
			formData.append('description', formFields.description);
			formData.append('notes', formFields.notes);
			formData.append('fileName', uploadFile.file.name);
			await fetch(`${config.backendUrl}/uploadfile`, {
				method: 'POST',
				body: formData,
			});
			setFormFields({ ..._initialFormFields });
			setUploadFile({ ..._initialUploadFile });
			fetchFileItems();
			if (titleField.current !== null) {
				titleField.current.focus();
			}
		}
	};


	return (
		<AppContext.Provider
			value={{
				appTitle,
				uploadFile,
				setUploadFile,
				formFields,
				setFormFields,
				fileItems,
				setFileItems,
				fetchFileItems,
				handleSubmit
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
