import { FAVORITE_CREATE_FAIL, FAVORITE_CREATE_REQUEST, FAVORITE_CREATE_SUCCESS, FAVORITE_DELETE_FAIL, FAVORITE_DELETE_REQUEST, FAVORITE_DELETE_SUCCESS, FAVORITE_LIST_FAIL, FAVORITE_LIST_REQUEST, FAVORITE_LIST_SUCCESS } from "../constants/favoriteConstant";

export const favoriteListReducer = (state = { loading: true, favorites: [] }, action) => {
    switch (action.type) {
        case FAVORITE_LIST_REQUEST:
            return { loading: true };
        case FAVORITE_LIST_SUCCESS:
            return { loading: false, favorites: action.payload };
        case FAVORITE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const favoriteCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case FAVORITE_CREATE_REQUEST:
            return { loading: true };
        case FAVORITE_CREATE_SUCCESS:
            return { loading: false, success: true, favorite: action.payload };
        case FAVORITE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const favoriteDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case FAVORITE_DELETE_REQUEST:
            return { loading: true };
        case FAVORITE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case FAVORITE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};