/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurant, detailsRestaurant } from '../redux/actions/restaurantActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import Axios from 'axios';

export default function RestaurantEditScreen(props) {

    const restaurantId = props.match.params.id;
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const restaurantDetails = useSelector(state => state.restaurantDetails);
    const { loading, error, restaurant } = restaurantDetails;

    const restaurantUpdate = useSelector(state => state.restaurantUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = restaurantUpdate;


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    useEffect(() => {
        if (successUpdate) {
            props.history.push(`/restaurants/${restaurantId}`);
        }
        if (!restaurant || restaurant._id !== restaurantId) {
            dispatch(detailsRestaurant(restaurantId));
        } else {
            setName(restaurant.name);
            setImage(restaurant.image);
            setDescription(restaurant.description);
        }
    }, [restaurant, dispatch, restaurantId, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateRestaurant({
            _id: restaurantId,
            name,
            image,
            description
        }));
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
            <Form onSubmit={submitHandler}>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Label>Redaguoti restoraną</Label>
                    </Col>
                </FormGroup>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormGroup row>
                    <Label for="nameField" sm={1}>Restorano pavadinimas</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="text" name="name" id="nameField" placeholder="Įveskite restorano pavadinimą" value={name} onChange={(e) => setName(e.target.value)} />
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
                <FormGroup row>
                    <Label for="descriptionField" sm={1}>Aprašymas</Label>
                    <Col md={{ size: 4 }}>
                        <Input type="textarea" name="description" id="descriptionField" placeholder="Įveskite aprašymą" value={description} onChange={(e) => setDescription(e.target.value)} />
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