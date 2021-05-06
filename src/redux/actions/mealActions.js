import Axios from "axios";
import { MEAL_APPROVE_FAIL, MEAL_APPROVE_REQUEST, MEAL_APPROVE_SUCCESS, MEAL_CREATE_FAIL, MEAL_CREATE_REQUEST, MEAL_CREATE_SUCCESS, MEAL_DELETE_FAIL, MEAL_DELETE_REQUEST, MEAL_DELETE_SUCCESS, MEAL_DETAILS_FAIL, MEAL_DETAILS_REQUEST, MEAL_DETAILS_SUCCESS, MEAL_LIST_FAIL, MEAL_LIST_REQUEST, MEAL_LIST_SUCCESS, MEAL_UPDATE_FAIL, MEAL_UPDATE_REQUEST, MEAL_UPDATE_SUCCESS } from '../constants/mealConstants';

export const listMeals = () => async (dispatch) => {
    dispatch({ type: MEAL_LIST_REQUEST });
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

export const createMeal = (name, restaurant_id, kcal, protein, fat, carbohydrates, servingWeight, createdBy, image) => async (dispatch, getState) => {
    dispatch({ type: MEAL_CREATE_REQUEST, payload: { name, restaurant_id, kcal, protein, fat, carbohydrates, servingWeight, createdBy, image } });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.post('/api/meals', { name, restaurant_id, kcal, protein, fat, carbohydrates, servingWeight, createdBy, image }, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: MEAL_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEAL_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const updateMeal = (meal) => async (dispatch, getState) => {
    dispatch({ type: MEAL_UPDATE_REQUEST, payload: meal });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.put(`/api/meals/${meal._id}`, meal, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: MEAL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEAL_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const deleteMeal = (mealId) => async (dispatch, getState) => {
    dispatch({ type: MEAL_DELETE_REQUEST, payload: mealId });
    const { userSignin: { userInfo } } = getState();
    try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await Axios.delete(`/api/meals/${mealId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: MEAL_DELETE_SUCCESS });
    } catch (error) {
        dispatch({ type: MEAL_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const approveMeal = (mealId) => async (dispatch, getState) => {
    dispatch({ type: MEAL_APPROVE_REQUEST, payload: mealId });
    const { userSignin: { userInfo } } = getState();
    try {
        //body is not used
        // eslint-disable-next-line no-unused-vars
        const { data } = await Axios.put(`/api/meals/${mealId}/changeApprove`, "approve", {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: MEAL_APPROVE_SUCCESS });
    } catch (error) {
        dispatch({ type: MEAL_APPROVE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

