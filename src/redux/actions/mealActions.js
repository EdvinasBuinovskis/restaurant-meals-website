import Axios from "axios";
import { MEAL_CREATE_FAIL, MEAL_CREATE_REQUEST, MEAL_CREATE_SUCCESS, MEAL_DETAILS_FAIL, MEAL_DETAILS_REQUEST, MEAL_DETAILS_SUCCESS, MEAL_LIST_FAIL, MEAL_LIST_REQUEST, MEAL_LIST_SUCCESS } from '../constants/mealConstants';

export const listMeals = () => async (dispatch) => {
    dispatch({
        type: MEAL_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/meals');
        dispatch({ type: MEAL_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEAL_LIST_FAIL, payload: error.message });
    }
};

export const detailsMeal = (mealId) => async (dispatch) => {
    dispatch({ type: MEAL_DETAILS_REQUEST, payload: mealId });
    try {
        const { data } = await Axios.get(`/api/meals/${mealId}`);
        dispatch({ type: MEAL_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEAL_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const createMeal = (name, restaurant_id, kcal, protein, fat, carbohydrates, servingWeight, createdBy) => async (dispatch, getState) => {
    dispatch({ type: MEAL_CREATE_REQUEST, payload: { name, restaurant_id, kcal, protein, fat, carbohydrates, servingWeight, createdBy } });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.post('/api/meals', { name, restaurant_id, kcal, protein, fat, carbohydrates, servingWeight, createdBy }, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: MEAL_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEAL_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

