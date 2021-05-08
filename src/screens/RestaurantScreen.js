/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Jumbotron, ListGroup } from 'reactstrap';
import LoadingBox from '../components/LoadingBox';
import Meal from '../components/Meal';
import MessageBox from '../components/MessageBox';
import { listMeals } from '../redux/actions/mealActions';
import { detailsRestaurant, deleteRestaurant } from '../redux/actions/restaurantActions';

export default function RestaurantScreen(props) {
    const dispatch = useDispatch();
    const restaurantId = props.match.params.id;
    const restaurantDetails = useSelector(state => state.restaurantDetails);
    const { loading, error, restaurant } = restaurantDetails;


    const mealList = useSelector(state => state.mealList);
    const { loading: loadingList, error: errorList, meals: meals } = mealList;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;


    const restaurantDelete = useSelector(state => state.restaurantDelete);
    const { success: successDelete } = restaurantDelete;


    useEffect(() => {
        dispatch(detailsRestaurant(restaurantId));
        dispatch(listMeals());
    }, [dispatch, restaurantId]);

    useEffect(() => {
        if (successDelete)
            props.history.push(`/restaurants`)
    }, [successDelete]);

    // const mealsFiltered = meals.filter(obj => obj.company === restaurant.company);
    // console.log("meals: ", meals);

    const deleteHandler = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteRestaurant(restaurantId));
        }
    };


    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <div>
                            <div>
                                {
                                    userInfo ? (
                                        <div>
                                            {userInfo.isAdmin ? (
                                                <div>
                                                    <Button href={`/restaurants/${restaurant._id}/edit`} >Redaguoti</Button>
                                                    <Button onClick={() => deleteHandler()}>Pašalinti</Button>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                                <Jumbotron fluid>
                                    <Container fluid>
                                        <img top src={`${process.env.REACT_APP_IMG}${restaurant.image}`} alt="failed to load photo :/" style={{ maxWidth: '22rem', maxHeight: '22rem' }}></img>
                                        {/* <img top src={restaurant.image} alt="failed to load photo :/" style={{ maxWidth: '22rem', maxHeight: '22rem' }}></img> */}
                                        <h1 className="display-3">{restaurant.name}</h1>
                                        <p className="lead">{restaurant.description}</p>
                                    </Container>
                                </Jumbotron>
                            </div>
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
                    )}

        </div>
    );
}
