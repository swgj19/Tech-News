import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from './context';

const Modal = () => {
	const { isModalOpen, closeModal, removeStory, activeStoryId } =
		useGlobalContext();

	return (
		<div
			className={`${
				isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'
			}`}
		>
			<div className='modal-container'>
				<h3>Are you sure you want to remove this post?</h3>
				<div>
					<a className='remove-btn' onClick={() => removeStory(activeStoryId)}>
						<button className='remove-post'>remove</button>
					</a>
				</div>
				<button className='close-modal-btn' onClick={closeModal}>
					<FaTimes />
				</button>
			</div>
		</div>
	);
};

export default Modal;
