/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMeal } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { listRestaurants } from '../redux/actions/restaurantActions';
import Axios from 'axios';

export default function MealCreateScreen(props) {

    const [name, setName] = useState('');
    const [restaurant_id, setRestaurantId] = useState('');
    const [kcal, setKcal] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [servingWeight, setServingWeight] = useState('');
    const [image, setImage] = useState('');


    const dispatch = useDispatch();

    const mealCreate = useSelector((state) => state.mealCreate);
    const { success, error, loading } = mealCreate;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const restaurantList = useSelector(state => state.restaurantList);
    const { loading: loadingList, error: errorList, restaurants } = restaurantList;

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    useEffect(() => {
        dispatch(listRestaurants());
        if (success) {
            props.history.push('/mymeals');
        }
    }, [dispatch, success]);

    const createHandler = (e) => {
        e.preventDefault();
        dispatch(createMeal(name, restaurant_id, kcal, protein, fat, carbohydrates, servingWeight, userInfo._id, image));
    };

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
            <Form onSubmit={createHandler}>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Label>Pridėti naują patiekalą</Label>
                    </Col>
                </FormGroup>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormGroup row>
                    <Label for="nameField" sm={1}>Patiekalo pavadinimas</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="text" name="name" id="nameField" placeholder="Įveskite patiekalo pavadinimą" onChange={(e) => setName(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="restaurantSelect" sm={1}>Restoranas</Label>
                    <Col md={{ size: 4 }}>
                        {loadingList ? (<LoadingBox></LoadingBox>) :
                            errorList ? (<MessageBox variant="danger">{error}</MessageBox>) :
                                (
                                    <Input type="select" name="select" id="restaurantSelect" onClick={(e) => setRestaurantId(e.target.value)}>
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
                        <Input required type="number" name="kcal" id="kcalField" placeholder="Įveskite kalorijas" onChange={(e) => setKcal(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="proteinField" sm={1}>Baltymai</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" step="0.1" name="protein" id="proteinField" placeholder="Įveskite baltymų kiekį" onChange={(e) => setProtein(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="fatField" sm={1}>Riebalai</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" step="0.1" name="fat" id="fatField" placeholder="Įveskite riebalų kiekį" onChange={(e) => setFat(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="carbohydratesField" sm={1}>Angliavandeniai</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" step="0.1" name="carbohydrates" id="carbohydratesField" placeholder="Įveskite angliavandenių kiekį" onChange={(e) => setCarbohydrates(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="servingWeightField" sm={1}>Porcijos svoris</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="number" name="servingWeight" id="servingWeightField" placeholder="Įveskite procijos svorį" onChange={(e) => setServingWeight(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="imageFile" sm={1}>Paveikslėlis</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="file" name="imageUpload" id="imageField" label="Choose Image" onChange={uploadFileHandler} />
                        <img src={`${process.env.REACT_APP_IMG}${image}`} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                        {loadingUpload && <LoadingBox></LoadingBox>}
                        {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Button type="submit">Pridėti</Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
}