/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeal, detailsMeal } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listRestaurants } from '../redux/actions/restaurantActions';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBInputGroup, MDBInputGroupText, MDBRow } from 'mdb-react-ui-kit';
import { Input } from 'reactstrap';
import { uploadImage } from '../redux/actions/imageActions';

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

    const imageUpload = useSelector((state) => state.imageUpload);
    const { success: uploadSuccess, error: uploadError, loading: uploadLoading, image: newImage } = imageUpload;

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
        if (uploadSuccess) {
            dispatch(updateMeal({
                _id: mealId,
                name,
                restaurant_id,
                kcal,
                protein,
                fat,
                carbohydrates,
                servingWeight,
                image: newImage
            })
            );
        }
    }, [uploadSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (kcalValidation() !== 'good')
            return;
        if (previewSource) {
            uploadFileHandler();
            return;
        }
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

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const uploadFileHandler = () => {
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
                                    onChange={(e) => setKcal(Math.round(e.target.value))}
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
                                <Input type="file" name="imageUpload" id="imageField" onChange={changeFileHandler} className='mb-2' />
                                {!previewSource ? (
                                    <img src={`${process.env.REACT_APP_IMG}${image}`} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                                ) : (
                                    <img src={previewSource} style={{ maxWidth: '22rem', maxHeight: '22rem' }} />
                                )}
                                {uploadLoading && <LoadingBox></LoadingBox>}
                                {uploadError && (<MessageBox variant="danger">{uploadError}</MessageBox>)}
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