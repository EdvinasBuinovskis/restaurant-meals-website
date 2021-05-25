/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRestaurant } from '../redux/actions/restaurantActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Input } from 'reactstrap';
import Axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';

export default function RestaurantCreateScreen(props) {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [previewSource, setPreviewSource] = useState('');
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

    useEffect(() => {
        if (image !== '') {
            dispatch(createRestaurant({
                name,
                image,
                description
            }));
        }
    }, [image]);

    const createHandler = (e) => {
        e.preventDefault();
        uploadFileHandler();
    };

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const uploadFileHandler = () => {
        if (!previewSource) return
        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', JSON.stringify({ data: base64EncodedImage }), {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
            });
            setImage(data);
            console.log(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }


    return (
        <MDBContainer>
            <MDBRow className="d-flex justify-content-center py-4">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={createHandler}>
                                <h4 className="text-center py-4">Pridėti naują restoraną</h4>
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                                <MDBInput className='mb-3'
                                    id="nameField"
                                    label="Restorano pavadinimas"
                                    placeholder="Įveskite restorano pavadinimą"
                                    type="text"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label>Pasirinkite paveikslėlį</label>
                                <Input required type="file" name="imageUpload" id="imageField" onChange={changeFileHandler} className='mb-2' />
                                {previewSource && (
                                    <img src={previewSource} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                                )}
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                                <MDBInput className='mb-3 mt-3'
                                    id="descriptionField"
                                    label="Aprašymas"
                                    placeholder="Įveskite aprašymą"
                                    textarea
                                    rows={4}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="text-center">
                                    <MDBBtn color="primary" type="submit">
                                        Pridėti
                                </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}