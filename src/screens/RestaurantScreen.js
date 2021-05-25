/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Jumbotron, ListGroup } from 'reactstrap';
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

    const deleteHandler = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteRestaurant(restaurantId));
        }
    };


    return (
        <>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <>
                            <>
                                <Jumbotron fluid style={{ padding: "1rem", marginBottom: "0.1rem" }}>
                                    <Container fluid style={{ padding: "0rem" }}>
                                        {
                                            userInfo?.isAdmin ? (
                                                <div style={{ padding: "0.5rem" }}>
                                                    <MDBBtn href={`/restaurants/${restaurant._id}/edit`} tag='a' color='none' className='m-1' >
                                                        <MDBIcon fas className='ms-1' icon='edit' size='2x' />
                                                    </MDBBtn>
                                                    <MDBBtn onClick={() => deleteHandler()} tag='a' color='none' className='m-1' >
                                                        <MDBIcon fas className='ms-1' icon='trash' size='2x' color="danger" />
                                                    </MDBBtn>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }
                                        <img top src={`${process.env.REACT_APP_IMG}${restaurant.image}`} alt="failed to load photo :/" style={{ maxWidth: '22rem', maxHeight: '22rem' }}></img>
                                        <h1 className="display-3">{restaurant.name}</h1>
                                        <p className="lead">{restaurant.description}</p>
                                    </Container>
                                </Jumbotron>
                            </>
                            {loadingList ? (<LoadingBox></LoadingBox>) :
                                errorList ? (<MessageBox variant="danger">{error}</MessageBox>) :
                                    (
                                        <ListGroup style={{ padding: "1rem" }}>
                                            {meals.filter(obj => obj.restaurant_id === restaurant._id).map(meal => (
                                                <Meal key={meal._id} meal={meal}></Meal>
                                            ))}
                                        </ListGroup>
                                    )}
                        </>
                    )}

        </>
    );
}
