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
            <Route exact path="/signin" component={SigninScreen}></Route>
            <Route exact path="/register" component={RegisterScreen}></Route>
            <PrivateRoute exact path="/favorites" component={FavoritesScreen}></PrivateRoute>
            <PrivateRoute exact path="/mymeals" component={UserMealScreen}></PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

function FavoritesScreen() {
  return (
    <h1>FavoritesScreen</h1>
  )
}

function UserMealScreen() {
  return (
    <h1>UserMealScreen</h1>
  )
}

export default App;
