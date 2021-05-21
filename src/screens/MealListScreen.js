import { ListGroup } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listMeals } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Meal from '../components/Meal';
import Search from '../components/Search';

export default function RestaurantListScreen() {

    const dispatch = useDispatch();
    const mealList = useSelector(state => state.mealList);
    const { loading, error, meals } = mealList;

    const [searchTerm, setSearchTerm] = useState('');

    const filterMeals = () => {
        if (searchTerm === '') {
            return meals;
        }

        return meals.filter((meal) => {
            const mealName = meal.name.toLowerCase();
            const termToLow = searchTerm.toLowerCase();
            return mealName.includes(termToLow);
        });
    };

    useEffect(() => {
        dispatch(listMeals());
    }, [dispatch]);

    return (
        <>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <>
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <ListGroup style={{ padding: "1rem" }}>
                                {filterMeals().map(meal => (
                                    <Meal key={meal._id} meal={meal}></Meal>
                                ))}
                            </ListGroup>
                        </>
                    )}
        </>
    );
}