import Axios from "axios";
import { RESTAURANT_CREATE_FAIL, RESTAURANT_CREATE_REQUEST, RESTAURANT_CREATE_SUCCESS, RESTAURANT_DELETE_FAIL, RESTAURANT_DELETE_REQUEST, RESTAURANT_DELETE_SUCCESS, RESTAURANT_DETAILS_FAIL, RESTAURANT_DETAILS_REQUEST, RESTAURANT_DETAILS_SUCCESS, RESTAURANT_LIST_FAIL, RESTAURANT_LIST_REQUEST, RESTAURANT_LIST_SUCCESS, RESTAURANT_UPDATE_FAIL, RESTAURANT_UPDATE_REQUEST, RESTAURANT_UPDATE_SUCCESS } from '../constants/restaurantConstants';
// Axios.defaults.baseURL = "https://restaurant-meals.herokuapp.com";
export const listRestaurants = () => async (dispatch) => {
    dispatch({
        type: RESTAURANT_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/restaurants');
        dispatch({ type: RESTAURANT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RESTAURANT_LIST_FAIL, payload: error.message });
    }
};

export const detailsRestaurant = (restaurantId) => async (dispatch) => {
    dispatch({ type: RESTAURANT_DETAILS_REQUEST, payload: restaurantId });
    try {
        const { data } = await Axios.get(`/api/restaurants/${restaurantId}`);
        dispatch({ type: RESTAURANT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RESTAURANT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};


export const createRestaurant = (restaurant) => async (dispatch, getState) => {
    dispatch({ type: RESTAURANT_CREATE_REQUEST, payload: restaurant });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.post('/api/restaurants', restaurant, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: RESTAURANT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RESTAURANT_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const updateRestaurant = (restaurant) => async (dispatch, getState) => {
    dispatch({ type: RESTAURANT_UPDATE_REQUEST, payload: restaurant });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.put(`/api/restaurants/${restaurant._id}`, restaurant, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: RESTAURANT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RESTAURANT_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const deleteRestaurant = (restaurantId) => async (dispatch, getState) => {
    dispatch({ type: RESTAURANT_DELETE_REQUEST, payload: restaurantId });
    const { userSignin: { userInfo } } = getState();
    try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await Axios.delete(`/api/restaurants/${restaurantId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: RESTAURANT_DELETE_SUCCESS });
    } catch (error) {
        dispatch({ type: RESTAURANT_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

