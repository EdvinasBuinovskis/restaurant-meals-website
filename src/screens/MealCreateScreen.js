/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMeal } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Input } from 'reactstrap';
import { listRestaurants } from '../redux/actions/restaurantActions';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBInputGroup, MDBInputGroupText, MDBRow } from 'mdb-react-ui-kit';
import { uploadImage } from '../redux/actions/imageActions';

export default function MealCreateScreen(props) {

    const [name, setName] = useState('');
    const [restaurant_id, setRestaurantId] = useState('');
    const [kcal, setKcal] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [servingWeight, setServingWeight] = useState('');

    const [previewSource, setPreviewSource] = useState('');

    const dispatch = useDispatch();

    const mealCreate = useSelector((state) => state.mealCreate);
    const { success, error, loading } = mealCreate;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const restaurantList = useSelector(state => state.restaurantList);
    const { loading: loadingList, error: errorList, restaurants } = restaurantList;

    const imageUpload = useSelector((state) => state.imageUpload);
    const { success: uploadSuccess, error: uploadError, loading: uploadLoading, image } = imageUpload;

    useEffect(() => {
        dispatch(listRestaurants());
        if (success) {
            props.history.push('/mymeals');
        }
    }, [dispatch, success]);

    useEffect(() => {
        if (uploadSuccess) {
            dispatch(createMeal(name, restaurant_id, kcal, protein, fat, carbohydrates, servingWeight, userInfo._id, image));
        }
    }, [uploadSuccess]);

    const createHandler = (e) => {
        e.preventDefault();
        if (kcalValidation() !== 'good')
            return;
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
        dispatch(uploadImage(previewSource));
    }

    const kcalValidation = () => {
        const approxKcal = protein * 4 + fat * 9 + carbohydrates * 4;
        const bias = 20;
        if (approxKcal > (kcal + bias) || approxKcal < (kcal - bias))
            return alert("Neteisingai įvedėte maistinę informaciją");
        return 'good';
    }

    return (
        <MDBContainer>
            <MDBRow className="d-flex justify-content-center py-4">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={createHandler}>
                                <h4 className="text-center py-4">Pridėti naują patiekalą</h4>
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                                <MDBInput className='mb-3'
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
                                                    <Input type="select" name="select" id="restaurantSelect" onClick={(e) => setRestaurantId(e.target.value)}>
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
                                <MDBInput className='mb-3'
                                    id="kcalField"
                                    label="Kalorijos"
                                    placeholder="Įveskite kalorijas"
                                    type="number"
                                    required
                                    onChange={(e) => setKcal(Math.round(e.target.value))}
                                />
                                <MDBInput className='mb-3'
                                    id="proteinField"
                                    label="Baltymai"
                                    placeholder="Įveskite baltymų kiekį"
                                    type="number"
                                    step="0.1"
                                    required
                                    onChange={(e) => setProtein(e.target.value)}
                                />
                                <MDBInput className='mb-3'
                                    id="fatField"
                                    label="Riebalai"
                                    placeholder="Įveskite riebalų kiekį"
                                    type="number"
                                    step="0.1"
                                    required
                                    onChange={(e) => setFat(e.target.value)}
                                />
                                <MDBInput className='mb-3'
                                    id="carbohydratesField"
                                    label="Angliavandeniai"
                                    placeholder="Įveskite angliavandenių kiekį"
                                    type="number"
                                    step="0.1"
                                    required
                                    onChange={(e) => setCarbohydrates(e.target.value)}
                                />
                                <MDBInput className='mb-3'
                                    id="servingWeightField"
                                    label="Porcijos svoris"
                                    placeholder="Įveskite procijos svorį"
                                    type="number"
                                    required
                                    onChange={(e) => setServingWeight(e.target.value)}
                                />
                                <label>Pasirinkite paveikslėlį</label>
                                <Input required type="file" name="imageUpload" id="imageField" onChange={changeFileHandler} className='mb-2' />
                                {previewSource && (
                                    <img src={previewSource} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                                )}
                                {uploadLoading && <LoadingBox></LoadingBox>}
                                {uploadError && (<MessageBox variant="danger">{uploadError}</MessageBox>)}
                                <div className="text-center">
                                    <MDBBtn color="primary" type="submit" className='mt-3'>
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