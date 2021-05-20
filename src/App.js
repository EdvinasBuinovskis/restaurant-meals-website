import React from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

// import Header from './components/Header';

import RestaurantListScreen from './screens/RestaurantListScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import RestaurantCreateScreen from './screens/RestaurantCreateScreen';
import RestaurantEditScreen from './screens/RestaurantEditScreen';

import MealListScreen from './screens/MealListScreen';
import MealScreen from './screens/MealScreen';
import MealCreateScreen from './screens/MealCreateScreen';
import MealEditScreen from './screens/MealEditScreen';

import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';

import UserMealScreen from './screens/UserMealScreen';
import FavoritesScreen from './screens/FavoritesScreen';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AdminRoute from './components/AdminRoute';


import HeaderMDB from './components/HeaderMDB';

import Axios from 'axios';

function App() {
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'development' ? Axios.defaults.baseURL = process.env.REACT_APP_DEV_API : Axios.defaults.baseURL = process.env.REACT_APP_PROD_API
  return (
    <div className="App">
      {/* <Header /> */}
      <HeaderMDB />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RestaurantListScreen}></Route>
          <Route exact path="/restaurants" component={RestaurantListScreen}></Route>
          <AdminRoute exact path="/restaurants/add" component={RestaurantCreateScreen}></AdminRoute>
          <Route exact path="/restaurants/:id" component={RestaurantScreen}></Route>
          <AdminRoute exact path="/restaurants/:id/edit" component={RestaurantEditScreen}></AdminRoute>
          <Route exact path="/meals" component={MealListScreen}></Route>
          <Route exact path="/meals/:id" component={MealScreen}></Route>
          <PublicRoute exact path="/signin" component={SigninScreen}></PublicRoute>
          <PublicRoute exact path="/register" component={RegisterScreen}></PublicRoute>
          <PrivateRoute exact path="/favorites" component={FavoritesScreen}></PrivateRoute>
          <PrivateRoute exact path="/mymeals" component={UserMealScreen}></PrivateRoute>
          <PrivateRoute exact path="/mymeals/add" component={MealCreateScreen}></PrivateRoute>
          <PrivateRoute exact path="/mymeals/:id/edit" component={MealEditScreen}></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
