import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { IFormFields, IUploadFile, _initialFormFields, _initialUploadFile } from './interfaces';

interface IAppContext {
	appTitle: string;
	uploadFile: IUploadFile;
	setUploadFile: (file: IUploadFile) => void;
	formFields: IFormFields;
	setFormFields: (field: IFormFields) => void;
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
	const appTitle = 'File Uploader';

	return (
		<AppContext.Provider
			value={{
				appTitle,
				uploadFile,
				setUploadFile,
				formFields,
				setFormFields
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
