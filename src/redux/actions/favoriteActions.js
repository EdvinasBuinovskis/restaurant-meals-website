import Axios from "axios";
import { FAVORITE_CREATE_FAIL, FAVORITE_CREATE_REQUEST, FAVORITE_CREATE_SUCCESS, FAVORITE_DELETE_FAIL, FAVORITE_DELETE_REQUEST, FAVORITE_DELETE_SUCCESS, FAVORITE_LIST_FAIL, FAVORITE_LIST_REQUEST, FAVORITE_LIST_SUCCESS } from "../constants/favoriteConstant";

export const listFavorites = () => async (dispatch, getState) => {
    dispatch({ type: FAVORITE_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.get('/api/favorites', {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: FAVORITE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FAVORITE_LIST_FAIL, payload: error.message });
    }
};

export const createFavorite = (favorite) => async (dispatch, getState) => {
    dispatch({ type: FAVORITE_CREATE_REQUEST, payload: { favorite } });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.post('/api/favorites', { favorite }, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: FAVORITE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FAVORITE_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const deleteFavorite = (favorite) => async (dispatch, getState) => {
    dispatch({ type: FAVORITE_DELETE_REQUEST, payload: { favorite } });
    const { userSignin: { userInfo } } = getState();
    try {
        // eslint-disable-next-line no-unused-vars
        // const { data } = await Axios.delete('/api/favorites', { favorite }, {
        //     headers: { Authorization: `Bearer ${userInfo.token}` }
        // });
        Axios.delete('/api/favorites', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
            data: {
                favorite
            }
        });
        dispatch({ type: FAVORITE_DELETE_SUCCESS });
    } catch (error) {
        dispatch({ type: FAVORITE_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

