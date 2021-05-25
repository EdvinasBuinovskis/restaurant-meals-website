/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeal, detailsMeal } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listRestaurants } from '../redux/actions/restaurantActions';
import Axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBInputGroup, MDBInputGroupText, MDBRow } from 'mdb-react-ui-kit';
import { Input } from 'reactstrap';

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
    const [previewSource, setPreviewSource] = useState('');

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

    useEffect(() => {
        if (previewSource !== '')
            uploadFileHandler();
    }, [previewSource]);

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
                                <h4 className="text-center py-4">Redaguoti patiekalą</h4>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                                <MDBInput className='mb-3'
                                    value={name}
                                    id="nameField"
                                    label="Patiekalo pavadinimas"
                                    placeholder="Įveskite patiekalo pavadinimą"
                                    type="text"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <MDBInputGroup className='mb-3'>
                                    {loadingList ? (<LoadingBox></LoadingBox>) :
                                        errorList ? (<MessageBox variant="danger">{error}</MessageBox>) :
                                            (
                                                <>
                                                    <Input type="select" name="select" id="restaurantSelect" value={restaurant_id} onClick={(e) => setRestaurantId(e.target.value)}>
                                                        <option>Pasirinkite restoraną</option>
                                                        {restaurants.map(restaurant => (
                                                            <option key={restaurant._id} value={restaurant._id}>{restaurant.name}</option>
                                                        ))}
                                                    </Input>
                                                    <MDBInputGroupText noBorder>
                                                        <MDBIcon fas icon='caret-down' />
                                                    </MDBInputGroupText>
                                                </>
                                            )}
                                </MDBInputGroup>
                                <MDBInput className='mb-3 active'
                                    value={kcal}
                                    id="kcalField"
                                    label="Kalorijos"
                                    placeholder="Įveskite kalorijas"
                                    type="number"
                                    required
                                    onChange={(e) => setKcal(e.target.value)}
                                />
                                <MDBInput className='mb-3 active'
                                    value={protein}
                                    id="proteinField"
                                    label="Baltymai"
                                    placeholder="Įveskite baltymų kiekį"
                                    type="number"
                                    step="0.1"
                                    required
                                    onChange={(e) => setProtein(e.target.value)}
                                />
                                <MDBInput className='mb-3 active'
                                    value={fat}
                                    id="fatField"
                                    label="Riebalai"
                                    placeholder="Įveskite riebalų kiekį"
                                    type="number"
                                    step="0.1"
                                    required
                                    onChange={(e) => setFat(e.target.value)}
                                />
                                <MDBInput className='mb-3 active'
                                    value={carbohydrates}
                                    id="carbohydratesField"
                                    label="Angliavandeniai"
                                    placeholder="Įveskite angliavandenių kiekį"
                                    type="number"
                                    step="0.1"
                                    required
                                    onChange={(e) => setCarbohydrates(e.target.value)}
                                />
                                <MDBInput className='mb-3 active'
                                    value={servingWeight}
                                    id="servingWeightField"
                                    label="Porcijos svoris"
                                    placeholder="Įveskite procijos svorį"
                                    type="number"
                                    required
                                    onChange={(e) => setServingWeight(e.target.value)}
                                />
                                <Input required type="file" name="imageUpload" id="imageField" onChange={changeFileHandler} className='mb-2' />
                                {!previewSource ? (
                                    <img src={`${process.env.REACT_APP_IMG}${image}`} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                                ) : (
                                    <img src={previewSource} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                                )}
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                                <div className="text-center">
                                    <MDBBtn color="primary" type="submit" className='mt-2'>
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