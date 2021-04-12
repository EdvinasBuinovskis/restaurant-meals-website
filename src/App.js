import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './components/Header';

import RestaurantListScreen from './screens/RestaurantListScreen';
import MealListScreen from './screens/MealListScreen';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={RestaurantListScreen}></Route>
            <Route path="/restaurants" component={RestaurantListScreen}></Route>
            <Route path="/meals" component={MealListScreen}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;