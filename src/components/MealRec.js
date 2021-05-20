/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listMeals } from '../redux/actions/mealActions';
import { MDBCardGroup } from 'mdb-react-ui-kit';
import MealCard from './MealCard';

export default function MealRec(props) {

    const { restaurantId } = props;
    const { mealName } = props;

    const dispatch = useDispatch();
    const mealList = useSelector(state => state.mealList);
    const { loading, error, meals } = mealList;

    const filterMeals = () => {
        return meals.filter((meal) => {
            const mealResId = meal.restaurant_id;
            return mealResId.includes(restaurantId) && meal.name !== mealName
        });
    };

    const sortMeals = () => {
        const numMeals = 4;
        return filterMeals().sort((a, b) => { return a.kcal - b.kcal }).slice(0, numMeals);
    }

    useEffect(() => {
        dispatch(listMeals());
    }, [dispatch]);

    return (
        <>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <MDBCardGroup>

                            <div className="row center">
                                <h4 style={{ padding: '0.5rem' }}>Rekomenduojami patiekalai</h4>
                                {sortMeals().map(meal => (
                                    <MealCard key={meal._id} meal={meal}></MealCard>
                                ))}
                            </div>
                        </MDBCardGroup>
                    )}
        </>
    )
}