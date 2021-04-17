/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeal, detailsMeal } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { listRestaurants } from '../redux/actions/restaurantActions';

export default function MealEditScreen(props) {

    const mealId = props.match.params.id;
    const [name, setName] = useState('');
    const [restaurant_id, setRestaurantId] = useState('');
    const [kcal, setKcal] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [servingWeight, setServingWeight] = useState('');

    const mealDetails = useSelector((state) => state.mealDetails);
    const { loading, error, meal } = mealDetails;

    const mealUpdate = useSelector(state => state.mealUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = mealUpdate;

    const restaurantList = useSelector(state => state.restaurantList);
    const { loading: loadingList, error: errorList, restaurants } = restaurantList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listRestaurants());
    }, [dispatch]);

    useEffect(() => {
        if (successUpdate) {
            props.history.push(`/meals/${mealId}`);
        }
        if (!meal || meal._id !== mealId) {
            dispatch(detailsMeal(mealId));
        } else {
            setName(meal.name);
            setRestaurantId(meal.restaurant_id);
            setKcal(meal.kcal);
            setProtein(meal.protein);
            setFat(meal.fat);
            setCarbohydrates(meal.carbohydrates);
            setServingWeight(meal.servingWeight);
        }
    }, [meal, dispatch, mealId, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateMeal({
            _id: mealId,
            name,
            restaurant_id,
            kcal,
            protein,
            fat,
            carbohydrates,
            servingWeight
        })
        );
    };

    return (

        <div md={{ size: 4, offset: 1 }}>
            <Form onSubmit={submitHandler}>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Label>Edit a meal</Label>
                    </Col>
                </FormGroup>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormGroup row>
                    <Label for="nameField" sm={1}>Meal name</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="text" name="name" id="nameField" placeholder="Enter meal name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="restaurantSelect" sm={1}>Restaurant</Label>
                    <Col md={{ size: 4 }}>
                        {loadingList ? (<LoadingBox></LoadingBox>) :
                            errorList ? (<MessageBox variant="danger">{error}</MessageBox>) :
                                (
                                    <Input type="select" name="select" id="restaurantSelect" value={restaurant_id} onClick={(e) => setRestaurantId(e.target.value)}>
                                        <option>-Select restaurant-</option>
                                        {restaurants.map(restaurant => (
                                            <option key={restaurant._id} value={restaurant._id}>{restaurant.name}</option>
                                        ))}
                                    </Input>
                                )}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="kcalField" sm={1}>Kcal</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" name="kcal" id="kcalField" placeholder="Enter kcal" value={kcal} onChange={(e) => setKcal(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="proteinField" sm={1}>Protein</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" step="0.1" name="protein" id="proteinField" placeholder="Enter protein amount" value={protein} onChange={(e) => setProtein(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="fatField" sm={1}>Fat</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" step="0.1" name="fat" id="fatField" placeholder="Enter fat amount" value={fat} onChange={(e) => setFat(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="carbohydratesField" sm={1}>Carbohydratese</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" step="0.1" name="carbohydrates" id="carbohydratesField" placeholder="Enter carbohydrates amount" value={carbohydrates} onChange={(e) => setCarbohydrates(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="servingWeightField" sm={1}>Serving Weight</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" name="servingWeight" id="servingWeightField" placeholder="Enter serving weight" value={servingWeight} onChange={(e) => setServingWeight(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Button type="submit">Update</Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
}