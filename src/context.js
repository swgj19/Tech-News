import React, { useContext, useState, useEffect, useReducer } from 'react';

import {
	SET_LOADING,
	SET_STORIES,
	REMOVE_STORY,
	HANDLE_PAGE,
	HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
	isLoading: true,
	hits: [],
	query: '',
	page: 0,
	nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeStoryId, setActiveStory] = useState();

	const fetchStories = async (url) => {
		dispatch({ type: SET_LOADING });
		try {
			const response = await fetch(url);
			const data = await response.json();
			dispatch({
				type: SET_STORIES,
				payload: { hits: data.hits, nbPages: data.nbPages },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const removeStory = (id) => {
		dispatch({ type: REMOVE_STORY, payload: id });
		setIsModalOpen(false);
	};

	const handleSearch = (query) => {
		dispatch({ type: HANDLE_SEARCH, payload: query });
	};

	const handlePage = (value) => {
		dispatch({ type: HANDLE_PAGE, payload: value });
	};

	const openModal = (id) => {
		setIsModalOpen(true);
		setActiveStory(id);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
	}, [state.query, state.page]);

	return (
		<AppContext.Provider
			value={{
				...state,
				removeStory,
				handleSearch,
				handlePage,
				isModalOpen,
				openModal,
				closeModal,
				activeStoryId,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
