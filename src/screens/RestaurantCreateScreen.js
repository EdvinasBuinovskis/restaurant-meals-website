/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRestaurant } from '../redux/actions/restaurantActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import Axios from 'axios';

export default function RestaurantCreateScreen(props) {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');


    const dispatch = useDispatch();

    const restaurantCreate = useSelector(state => state.restaurantCreate);
    const { success, error, loading } = restaurantCreate;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    useEffect(() => {
        if (success) {
            props.history.push('/restaurants');
        }
    }, [dispatch, success]);

    const createHandler = (e) => {
        e.preventDefault();
        dispatch(createRestaurant({
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
            <Form onSubmit={createHandler}>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Label>Pridėti naują restoraną</Label>
                    </Col>
                </FormGroup>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormGroup row>
                    <Label for="nameField" sm={1}>Restorano pavadinimas</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="text" name="name" id="nameField" placeholder="Įveskite restorano pavadinimą" onChange={(e) => setName(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="imageFile" sm={1}>Paveikslėlis</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="file" name="imageUpload" id="imageField" label="Choose Image" onChange={uploadFileHandler} />
                        <img src={image} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                        {loadingUpload && <LoadingBox></LoadingBox>}
                        {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="descriptionField" sm={1}>Aprašymas</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="textarea" name="description" id="descriptionField" placeholder="Įveskite aprašymą" onChange={(e) => setDescription(e.target.value)} />
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