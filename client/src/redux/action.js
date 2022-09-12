//ce fichier action permet de simplifier l'appel a la fonction addCount dans la vue

import { SET_USER } from "./type";

// export const addCount = () => {
// 	return {
// 		type: ADD_COUNT,
// 	};
// };
// export const resetCount = () => {
// 	return {
// 		type: RESET_COUNT,
// 	};
// };
// export const addTodo = (payload) => {
// 	return {
// 		type: ADD_TODO,
// 		payload,
// 	};
// };
export const setUser = (payload) => {
	return {
		type: SET_USER,
		payload,
	};
};
