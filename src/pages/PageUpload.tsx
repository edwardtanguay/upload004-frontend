import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useRef, useState, useEffect } from 'react';
import '../App.scss';
import {
	_initialUploadFile,
	_initialFormFields,
	IFileItem,
	IFormFields,
	IUploadFile,
} from '../interfaces';
import * as config from '../config';

export const PageUpload = () => {
	const { uploadFile, setUploadFile, formFields, setFormFields, fileItems, setFileItems, fetchFileItems, handleSubmit } = useContext(AppContext);

	const titleField = useRef<HTMLInputElement>(null);

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
					<form id="mainForm" onSubmit={(e) => handleSubmit(e, titleField)}>
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
