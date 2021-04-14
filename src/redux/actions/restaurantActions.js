import Axios from "axios";
import { RESTAURANT_DETAILS_FAIL, RESTAURANT_DETAILS_REQUEST, RESTAURANT_DETAILS_SUCCESS, RESTAURANT_LIST_FAIL, RESTAURANT_LIST_REQUEST, RESTAURANT_LIST_SUCCESS } from '../constants/restaurantConstants';

export const listRestaurants = () => async (dispatch) => {
    dispatch({
        type: RESTAURANT_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({ type: RESTAURANT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RESTAURANT_LIST_FAIL, payload: error.message });
    }
};

export const detailsRestaurant = (restaurantId) => async (dispatch) => {
    dispatch({ type: RESTAURANT_DETAILS_REQUEST, payload: restaurantId });
    try {
        const { data } = await Axios.get(`https://jsonplaceholder.typicode.com/users/${restaurantId}`);
        dispatch({ type: RESTAURANT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RESTAURANT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

