import { applyMiddleware, combineReducers, compose, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mealListReducer, mealDetailsReducer, mealCreateReducer, mealUpdateReducer, mealDeleteReducer, mealApproveReducer } from './reducers/mealReducers';
import { restaurantListReducer, restaurantDetailsReducer, restaurantCreateReducer, restaurantUpdateReducer, restaurantDeleteReducer } from './reducers/restaurantReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducers'
import { favoriteCreateReducer, favoriteDeleteReducer, favoriteListReducer } from './reducers/favoriteReducers';
import { imageUploadReducer } from './reducers/imageReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  }
};

const reducer = combineReducers({
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  mealCreate: mealCreateReducer,
  mealUpdate: mealUpdateReducer,
  mealDelete: mealDeleteReducer,
  mealApprove: mealApproveReducer,

  restaurantList: restaurantListReducer,
  restaurantDetails: restaurantDetailsReducer,
  restaurantCreate: restaurantCreateReducer,
  restaurantUpdate: restaurantUpdateReducer,
  restaurantDelete: restaurantDeleteReducer,

  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,

  favoriteList: favoriteListReducer,
  favoriteCreate: favoriteCreateReducer,
  favoriteDelete: favoriteDeleteReducer,

  imageUpload: imageUploadReducer

});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
