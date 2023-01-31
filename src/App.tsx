import './App.scss';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { PageDashboard } from './pages/PageDashboard';
import { PageUpload } from './pages/PageUpload';

function App() {
	return (
		<div className="App">
			<h1>File Uploader</h1>
			<nav>
				<NavLink to="/dashboard">Dashboard</NavLink>
				<NavLink to="/upload">Upload</NavLink>
			</nav>

			<Routes>
				<Route path="/dashboard" element={<PageDashboard />} />
				<Route path="/upload" element={<PageUpload />} />
				<Route
					path="/"
					element={<Navigate to="/dashboard" replace />}
				/>
			</Routes>
		</div>
	);
}

export default App;
