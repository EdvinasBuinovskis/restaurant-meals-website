/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, ListGroup } from 'reactstrap';
import LoadingBox from '../components/LoadingBox';
import Meal from '../components/Meal';
import MessageBox from '../components/MessageBox';
import image from '../images/image1.jpg';
import { listMeals } from '../redux/actions/mealActions';
import { detailsRestaurant } from '../redux/actions/restaurantActions';

export default function RestaurantScreen(props) {
    const dispatch = useDispatch();
    const restaurantId = props.match.params.id;
    const restaurantDetails = useSelector(state => state.restaurantDetails);
    const { loading, error, restaurant } = restaurantDetails;


    const mealList = useSelector(state => state.mealList);
    const { loading: loadingList, error: errorList, meals: meals } = mealList;


    useEffect(() => {
        dispatch(detailsRestaurant(restaurantId));
        dispatch(listMeals());
    }, [dispatch, restaurantId]);

    // const mealsFiltered = meals.filter(obj => obj.company === restaurant.company);
    // console.log("meals: ", meals);


    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <div>
                            <Link to="/restaurants">Go back</Link>
                            <Jumbotron fluid>
                                <Container fluid>
                                    <img top src={image} alt="failed to load photo :/"></img>
                                    <h1 className="display-3">{restaurant.name}</h1>
                                    <p className="lead">{restaurant.description}</p>
                                </Container>
                            </Jumbotron>
                        </div>
                    )}
            {loadingList ? (<LoadingBox></LoadingBox>) :
                errorList ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <div>
                            <ListGroup>
                                {meals.filter(obj => obj.restaurant_id === restaurant._id).map(meal => (
                                    <Meal key={meal._id} meal={meal}></Meal>
                                ))}
                            </ListGroup>
                        </div>
                    )}
        </div>
    );
}
