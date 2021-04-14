import { applyMiddleware, combineReducers, compose, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mealListReducer, mealDetailsReducer } from './reducers/mealReducers';
import { restaurantListReducer, restaurantDetailsReducer } from './reducers/restaurantReducers';

//pridet authentikacija
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  }
};

const reducer = combineReducers({
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  restaurantList: restaurantListReducer,
  restaurantDetails: restaurantDetailsReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
