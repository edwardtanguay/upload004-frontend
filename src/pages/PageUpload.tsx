import { useRef, useState, useEffect } from 'react';
import '../App.scss';
import axios from 'axios';
import {
	_initialUploadFile,
	_initialFormFields,
	IFileItem,
	IFormFields,
	IUploadFile,
} from '../interfaces';
import * as config from '../config';

export const PageUpload = () => {
	const [uploadFile, setUploadFile] = useState<IUploadFile>({
		..._initialUploadFile,
	});
	const [formFields, setFormFields] = useState<IFormFields>({
		..._initialFormFields,
	});
	const [fileItems, setFileItems] = useState<IFileItem[]>([]);

	const titleField = useRef<HTMLInputElement>(null);

	const fetchFileItems = () => {
		(async () => {
			setFileItems(
				(await axios.get(`${config.backendUrl}/fileitems`)).data
			);
		})();
	};

	useEffect(() => {
		fetchFileItems();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			const file = e.target.files[0];
			const _uploadFile = {
				file,
				preview: URL.createObjectURL(file),
			};
			setUploadFile(_uploadFile);
		} else {
			console.log('ERROR: files is null');
		}
	};

	const handleFormFieldChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => {
		const value = e.target.value;
		formFields[fieldName as keyof IFormFields] = value;
		setFormFields({ ...formFields });
	};

	return (
		<div className="page pageUpload">
			<main>
				<section>
					<form id="mainForm" onSubmit={(e) => handleSubmit(e)}>
						<fieldset>
							<legend>Enter file info and choose file:</legend>

							<label htmlFor="title">Title</label>
							<input
								type="text"
								ref={titleField}
								id="title"
								autoFocus
								value={formFields.title}
								onChange={(e) =>
									handleFormFieldChange(e, 'title')
								}
							/>

							<label htmlFor="description">Description</label>
							<input
								type="text"
								id="description"
								value={formFields.description}
								onChange={(e) =>
									handleFormFieldChange(e, 'description')
								}
							/>

							<label htmlFor="notes">Notes</label>
							<input
								type="text"
								value={formFields.notes}
								onChange={(e) =>
									handleFormFieldChange(e, 'notes')
								}
							/>

							<label>File to upload</label>
							<input
								type="file"
								onChange={(e) => handleFileChange(e)}
							></input>
							<div className="buttonArea">
								<div className="preview">
									{uploadFile.file?.name.endsWith('.jpg') ||
									uploadFile.file?.name.endsWith('.png') ? (
										<img
											src={uploadFile.preview}
											width="100"
											height="100"
										/>
									) : (
										<div className="previewFileName">
											{uploadFile.file?.name}
										</div>
									)}
								</div>
								<div className="buttonWrapper">
									<button type="submit">Submit</button>
								</div>
							</div>
						</fieldset>
					</form>
				</section>
				<section className="fileItemsArea">
					{fileItems.length < 2 && <h2>File Items</h2>}
					{fileItems.length >= 2 && (
						<h2>{fileItems.length} File Items</h2>
					)}
					{fileItems.length === 0 && (
						<p>There are {fileItems.length} file items</p>
					)}
					{fileItems.map((fileItem, i) => {
						return (
							<div className="fileItem" key={i}>
								<img
									src={`${config.backendUrl}/${fileItem.iconPathAndFileName}`}
								/>
								<div className="info">
									<div className="title">
										{fileItem.title}
									</div>
									<div className="description">
										{fileItem.description}
									</div>
									<div className="notes">
										{fileItem.notes}
									</div>
									<div className="fileName">
										<a
											target="_blank"
											href={`${config.backendUrl}/uploadedFiles/${fileItem.fileName}`}
										>
											{fileItem.fileName}
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</section>
			</main>
		</div>
	);
};
