import React from 'react';
import SearchForm from './SearchForm';
import Stories from './Stories';
import Buttons from './Buttons';
import Modal from './Modal';
import { useGlobalContext } from './context';
function App() {
	return (
		<>
			<SearchForm />
			<Stories />
			<Buttons />
			<Modal />
		</>
	);
}

export default App;
