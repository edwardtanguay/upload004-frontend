import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Helmet } from 'react-helmet';

export const PageAbout = () => {
	const { appTitle } = useContext(AppContext);

	return (
		<div className="pageAbout">
			<Helmet>
				<title>{appTitle} - About</title>
			</Helmet>
			<p>This is the about page.</p>
		</div>
	);
};