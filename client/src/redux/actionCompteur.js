//ce fichier action permet de simplifier l'appel a la fonction addCount dans la vue

import { ADD_COUNT, RESET_COUNT, ADD_TODO } from "./type";

export const addCount = () => {
	return {
		type: ADD_COUNT,
	};
};
export const resetCount = () => {
	return {
		type: RESET_COUNT,
	};
};
export const addTodo = (payload) => {
	return {
		type: ADD_TODO,
		payload,
	};
};
