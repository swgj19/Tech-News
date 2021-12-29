import React from 'react';
import { useGlobalContext } from './context';

const Stories = () => {
	const { isLoading, hits, removeStory } = useGlobalContext();
	const { openModal } = useGlobalContext();

	if (isLoading) {
		return <div className='loading'></div>;
	}
	return (
		<section className='stories'>
			{hits.map((story) => {
				const { objectID, title, num_comments, url, points, author, deleted } =
					story;
				return story && url && !deleted ? (
					<article key={objectID} className='story'>
						<h4 className='title'>{title}</h4>
						<p className='info'>
							{points} points by <span>{author} | </span>
							{num_comments} comments
						</p>
						<div>
							<a
								href={url}
								className='read-link'
								target='_blank'
								rel='noopener noreferrer'
							>
								<span className='links'>read more</span>
							</a>
							<a
								href='#'
								className='remove-btn'
								onClick={() => openModal(objectID)}
							>
								<span className='links'>remove</span>
							</a>
							{/* <a className='remove-btn' onClick={() => removeStory(objectID)}>
								<span class='links'>remove</span>
							</a> */}
						</div>
					</article>
				) : null;
			})}
		</section>
	);
};

export default Stories;
