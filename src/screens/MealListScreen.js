import { ListGroup } from 'reactstrap';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listMeals } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Meal from '../components/Meal';

export default function RestaurantListScreen() {

    const dispatch = useDispatch();
    const mealList = useSelector(state => state.mealList);
    const { loading, error, meals } = mealList;

    useEffect(() => {
        dispatch(listMeals());
    }, [dispatch]);

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <div>
                            <ListGroup>
                                {meals.map(meal => (
                                    <Meal key={meal.id} meal={meal}></Meal>
                                ))}
                            </ListGroup>
                        </div>
                    )}
        </div>
    );
}