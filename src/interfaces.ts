export interface IFileItem {
	title: string;
	description: string;
	notes: string;
	fileName: string;
	iconPathAndFileName: string;
}

export interface IFormFields {
	title: string;
	description: string;
	notes: string;
}

export interface IUploadFile {
	file: File | null;
	preview: string;
}

export const _initialFormFields = {
	title: '',
	description: '',
	notes: ''
};
export const _initialUploadFile: IUploadFile = {
	preview: '',
	file: null
};