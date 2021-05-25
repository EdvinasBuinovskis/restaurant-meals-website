/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurant, detailsRestaurant } from '../redux/actions/restaurantActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { Input } from 'reactstrap';

export default function RestaurantEditScreen(props) {

    const restaurantId = props.match.params.id;
    const [name, setName] = useState('');

    const [image, setImage] = useState('');
    const [previewSource, setPreviewSource] = useState('');

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

    useEffect(() => {
        if (previewSource !== '')
            uploadFileHandler();
    }, [previewSource]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateRestaurant({
            _id: restaurantId,
            name,
            image,
            description
        }));
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
                            <form onSubmit={submitHandler}>
                                <h4 className="text-center py-4">Redaguoti restoraną</h4>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                                <MDBInput className='mb-3'
                                    value={name}
                                    id="nameField"
                                    label="Restorano pavadinimas"
                                    placeholder="Įveskite restorano pavadinimą"
                                    type="text"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input required type="file" name="imageUpload" id="imageField" onChange={changeFileHandler} className='mb-2' />
                                {!previewSource ? (
                                    <img src={`${process.env.REACT_APP_IMG}${image}`} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                                ) : (
                                    <img src={previewSource} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                                )}
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                                <MDBInput className='mb-3 mt-3'
                                    value={description}
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
                                        Atnaujinti
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