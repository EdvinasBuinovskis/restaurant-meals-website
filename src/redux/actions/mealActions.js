import Axios from "axios";
import { MEAL_DETAILS_FAIL, MEAL_DETAILS_REQUEST, MEAL_DETAILS_SUCCESS, MEAL_LIST_FAIL, MEAL_LIST_REQUEST, MEAL_LIST_SUCCESS } from '../constants/mealConstants';

export const listMeals = () => async (dispatch) => {
    dispatch({
        type: MEAL_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({ type: MEAL_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEAL_LIST_FAIL, payload: error.message });
    }
};

export const detailsMeal = (mealId) => async (dispatch) => {
    dispatch({ type: MEAL_DETAILS_REQUEST, payload: mealId });
    try {
        const { data } = await Axios.get(`https://jsonplaceholder.typicode.com/users/${mealId}`);
        dispatch({ type: MEAL_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEAL_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

