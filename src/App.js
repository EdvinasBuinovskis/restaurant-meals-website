import React from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './components/Header';

import RestaurantListScreen from './screens/RestaurantListScreen';
import MealListScreen from './screens/MealListScreen';
import MealScreen from './screens/MealScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import PrivateRoute from './components/PrivateRoute';
import UserMealScreen from './screens/UserMealScreen';
import MealCreateScreen from './screens/MealCreateScreen';
import PublicRoute from './components/PublicRoute';
import MealEditScreen from './screens/MealEditScreen';
import FavoritesScreen from './screens/FavoritesScreen';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={RestaurantListScreen}></Route>
            <Route exact path="/restaurants" component={RestaurantListScreen}></Route>
            <Route exact path="/restaurants/:id" component={RestaurantScreen}></Route>
            <Route exact path="/meals" component={MealListScreen}></Route>
            <Route exact path="/meals/:id" component={MealScreen}></Route>
            <PublicRoute exact path="/signin" component={SigninScreen}></PublicRoute>
            <PublicRoute exact path="/register" component={RegisterScreen}></PublicRoute>
            <PrivateRoute exact path="/favorites" component={FavoritesScreen}></PrivateRoute>
            <PrivateRoute exact path="/mymeals" component={UserMealScreen}></PrivateRoute>
            <PrivateRoute exact path="/mymeals/add" component={MealCreateScreen}></PrivateRoute>
            <PrivateRoute exact path="/mymeals/:id/edit" component={MealEditScreen}></PrivateRoute>

          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
