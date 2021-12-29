import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
	const { isLoading, hits, page, nbPages, handlePage } = useGlobalContext();

	if (hits.length < 1) {
		return (
			<div className='btn-container'>
				<p className='center'>sorry, no results to display</p>
			</div>
		);
	}
	return !isLoading ? (
		<div className='btn-container'>
			<button
				className='btn-pag'
				disabled={isLoading}
				onClick={() => handlePage('dec')}
			>
				<p>prev</p>
			</button>
			<p>
				{page + 1} of {nbPages}
			</p>
			<button disabled={isLoading} onClick={() => handlePage('inc')}>
				<p>next</p>
			</button>
		</div>
	) : null;
};

export default Buttons;
