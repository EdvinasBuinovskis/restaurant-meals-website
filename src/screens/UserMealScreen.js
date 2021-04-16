import { Button, ListGroup } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listMeals } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Meal from '../components/Meal';
import Search from '../components/Search';

export default function UserMealScreen() {

    const dispatch = useDispatch();
    const mealList = useSelector(state => state.mealList);
    const { loading, error, meals } = mealList;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const [searchTerm, setSearchTerm] = useState('');

    const filterUserMeals = () => {
        return meals.filter(meal => meal.createdBy === userInfo._id);
    };

    const filterMeals = () => {
        console.log("users meals:", filterUserMeals());
        if (searchTerm === '') {
            return filterUserMeals();
        }

        return filterUserMeals().filter((meal) => {
            const mealName = meal.name.toLowerCase();
            return mealName.includes(searchTerm);
        });
    };

    useEffect(() => {
        dispatch(listMeals());
    }, [dispatch]);

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <div>
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <Button href="/mymeals/add">Add meal</Button>
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
