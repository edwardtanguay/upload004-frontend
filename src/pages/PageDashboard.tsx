import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const PageDashboard = () => {
	const { fileItems } = useContext(AppContext);
	return (
		<div className="page pageDashboard">
			<p>There are {fileItems.length} files uploaded:</p>
			<ul>
				{fileItems.map((fileItem, i) => {
					return (
						<li key={i}>{fileItem.title} ({fileItem.fileName})</li>
				)
			})}
			</ul>
		</div>
	);
};
