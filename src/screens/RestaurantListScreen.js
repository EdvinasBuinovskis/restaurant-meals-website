/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Restaurant from '../components/Restaurant';
import { listRestaurants } from '../redux/actions/restaurantActions';
import Search from '../components/Search';

export default function RestaurantListScreen() {
    const dispatch = useDispatch();
    const restaurantList = useSelector(state => state.restaurantList);
    const { loading, error, restaurants } = restaurantList;

    const [searchTerm, setSearchTerm] = useState('');

    const filterRestaurants = () => {
        if (searchTerm === '') {
            return restaurants;
        }

        return restaurants.filter((restaurant) => {
            const restaurantName = restaurant.name.toLowerCase();
            return restaurantName.includes(searchTerm);
        });
    };

    useEffect(() => {
        dispatch(listRestaurants());
    }, [dispatch]);

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <div>
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <div className="row center">
                                {filterRestaurants().map(restaurant => (
                                    <Restaurant key={restaurant._id} restaurant={restaurant}></Restaurant>
                                ))}
                            </div>
                        </div>
                    )}
        </div>
    );
}