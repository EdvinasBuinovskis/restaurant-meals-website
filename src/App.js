import React from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './components/Header';

import RestaurantListScreen from './screens/RestaurantListScreen';
import MealListScreen from './screens/MealListScreen';
import MealScreen from './screens/MealScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

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
            <Route exact path="/login" component={LoginScreen}></Route>
            <Route exact path="/register" component={RegisterScreen}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
