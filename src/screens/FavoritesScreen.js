import { ListGroup } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listMeals } from '../redux/actions/mealActions';
import { listFavorites } from '../redux/actions/favoriteActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Meal from '../components/Meal';
import Search from '../components/Search';

export default function FavoriteScreen() {

    const dispatch = useDispatch();
    const mealList = useSelector(state => state.mealList);
    const { loading, error, meals } = mealList;

    const favoriteList = useSelector(state => state.favoriteList);
    const { loading: loadingList, error: errorList, favorites } = favoriteList;

    const [searchTerm, setSearchTerm] = useState('');

    const filterFavoriteMeals = () => {
        return meals.filter(meal => favorites.includes(meal._id));
    };

    const filterMeals = () => {
        console.log("favorite meals:", filterFavoriteMeals());
        if (searchTerm === '') {
            return filterFavoriteMeals();
        }

        return filterFavoriteMeals().filter((meal) => {
            const mealName = meal.name.toLowerCase();
            return mealName.includes(searchTerm);
        });
    };

    useEffect(() => {
        dispatch(listMeals());
        dispatch(listFavorites());
    }, [dispatch]);

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    loadingList ? (<LoadingBox></LoadingBox>) :
                        errorList ? (<MessageBox variant="danger">{errorList}</MessageBox>) :
                            (
                                <div>
                                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                    <div>
                                        <ListGroup>
                                            {filterMeals().map(meal => (
                                                <Meal key={meal._id} meal={meal}></Meal>
                                            ))}
                                        </ListGroup>
                                    </div>
                                </div>
                            )}
        </div>
    );
}
