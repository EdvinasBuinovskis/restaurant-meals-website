/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeal, detailsMeal } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { listRestaurants } from '../redux/actions/restaurantActions';
import Axios from 'axios';

export default function MealEditScreen(props) {

    const mealId = props.match.params.id;
    const [name, setName] = useState('');
    const [restaurant_id, setRestaurantId] = useState('');
    const [kcal, setKcal] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [servingWeight, setServingWeight] = useState('');
    const [image, setImage] = useState('');

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
            setImage(meal.image);
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
            servingWeight,
            image
        })
        );
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    return (

        <div md={{ size: 4, offset: 1 }}>
            <Form onSubmit={submitHandler}>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Label>Redaguoti patiekalą</Label>
                    </Col>
                </FormGroup>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormGroup row>
                    <Label for="nameField" sm={1}>Patiekalo pavadinimas</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="text" name="name" id="nameField" placeholder="Įveskite patiekalo pavadinimą" value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="restaurantSelect" sm={1}>Restoranas</Label>
                    <Col md={{ size: 4 }}>
                        {loadingList ? (<LoadingBox></LoadingBox>) :
                            errorList ? (<MessageBox variant="danger">{error}</MessageBox>) :
                                (
                                    <Input type="select" name="select" id="restaurantSelect" value={restaurant_id} onClick={(e) => setRestaurantId(e.target.value)}>
                                        <option>-Pasirinkite restoraną-</option>
                                        {restaurants.map(restaurant => (
                                            <option key={restaurant._id} value={restaurant._id}>{restaurant.name}</option>
                                        ))}
                                    </Input>
                                )}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="kcalField" sm={1}>Kalorijos</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="number" name="kcal" id="kcalField" placeholder="Įveskite kalorijas" value={kcal} onChange={(e) => setKcal(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="proteinField" sm={1}>Baltymai</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="number" step="0.1" name="protein" id="proteinField" placeholder="Įveskite baltymų kiekį" value={protein} onChange={(e) => setProtein(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="fatField" sm={1}>Riebalai</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="number" step="0.1" name="fat" id="fatField" placeholder="Įveskite riebalų kiekį" value={fat} onChange={(e) => setFat(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="carbohydratesField" sm={1}>Angliavandeniai</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="number" step="0.1" name="carbohydrates" id="carbohydratesField" placeholder="Įveskite angliavandenių kiekį" value={carbohydrates} onChange={(e) => setCarbohydrates(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="servingWeightField" sm={1}>Porcijos svoris</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="number" name="servingWeight" id="servingWeightField" placeholder="Įveskite procijos svorį" value={servingWeight} onChange={(e) => setServingWeight(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="imageFile" sm={1}>Paveikslėlis</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="file" name="imageUpload" id="imageField" label="Choose Image" onChange={uploadFileHandler} />
                        <img src={`${process.env.REACT_APP_IMG}${image}`} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                        {loadingUpload && <LoadingBox></LoadingBox>}
                        {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Button type="submit">Atnaujinti</Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
}