/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsMeal, deleteMeal } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap';
import Activity from '../components/Activity';
import Favorite from '../components/Favorite';
import Approve from '../components/Approve';
import MealRec from '../components/MealRec';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBIcon, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdb-react-ui-kit';
import Chart from '../components/Chart';


export default function MealScreen(props) {
    const dispatch = useDispatch();
    const mealId = props.match.params.id;
    const mealDetails = useSelector(state => state.mealDetails);
    const { loading, error, meal } = mealDetails;

    const mealDelete = useSelector(state => state.mealDelete);
    const { success: successDelete } = mealDelete;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;



    useEffect(() => {
        dispatch(detailsMeal(mealId));
        if (successDelete)
            props.history.push(`/mymeals/`)
    }, [dispatch, mealId, successDelete]);

    const deleteHandler = () => {
        if (window.confirm('Ar tikrai norite pašalinti patiekalą?')) {
            dispatch(deleteMeal(mealId));
        }
    };

    return (
        <>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <>

                            {
                                userInfo ? (
                                    <div style={{ marginTop: "1rem", marginLeft: "1rem" }}>
                                        {
                                            userInfo.isAdmin ? (
                                                <Approve mealId={mealId} isApproved={meal.approved} />
                                            ) : (
                                                <></>
                                            )
                                        }
                                        <Favorite mealId={mealId} />
                                        {userInfo._id === meal.createdBy ? (
                                            <>
                                                <MDBBtn href={`/mymeals/${meal._id}/edit`} tag='a' color='none' className='m-1' >
                                                    <MDBIcon fas className='ms-1' icon='edit' size='2x' />
                                                </MDBBtn>
                                                <MDBBtn onClick={() => deleteHandler()} tag='a' color='none' className='m-1' >
                                                    <MDBIcon fas className='ms-1' icon='trash' size='2x' />
                                                </MDBBtn>
                                                {/* <Button href={`/mymeals/${meal._id}/edit`} >Redaguoti</Button>
                                                <Button onClick={() => deleteHandler()}>Pašalinti</Button> */}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                            {/* <Row>
                                <Col md={{ size: 4, offset: 1 }}>
                                    <Card>
                                        <CardImg top width="100%" src={meal.image} alt="failed to load photo :/" />
                                        <CardBody>
                                            <CardTitle tag="h5">{meal.name}</CardTitle>
                                            <CardText tag="h6">Kcal: {meal.kcal}</CardText>
                                            <CardText tag="h6">Protein:  {meal.protein}</CardText>
                                            <CardText tag="h6">Fat: {meal.fat}</CardText>
                                            <CardText tag="h6">Carbs: {meal.carbohydrates}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={{ size: 4, offset: 1 }}>
                                    <Activity kcal={meal.kcal} />
                                </Col>
                            </Row> */}
                            <MDBRow center className='row-cols-1 row-cols-md-3 py-4'>
                                <MDBCol>
                                    <MDBCard style={{ width: '30rem' }}>
                                        <MDBCardImage position='top' src={`${process.env.REACT_APP_IMG}${meal.image}`} alt="failed to load photo :/" style={{ maxWidth: '30rem', maxHeight: '30rem' }} />
                                        <MDBCardBody style={{ height: '3rem', padding: '0.7rem' }}>
                                            <MDBCardTitle>
                                                {meal.name}
                                                {meal.approved ? <MDBIcon className='ms-1' icon='check' size='sm' /> :
                                                    <></>
                                                }
                                            </MDBCardTitle>
                                        </MDBCardBody>
                                        <MDBListGroup flush>
                                            <MDBListGroupItem>Kalorijos:  {meal.kcal}</MDBListGroupItem>
                                            <MDBListGroupItem>Baltymai: {meal.protein}</MDBListGroupItem>
                                            <MDBListGroupItem>Riebalai: {meal.fat}</MDBListGroupItem>
                                            <MDBListGroupItem>Angliavandeniai: {meal.carbohydrates}</MDBListGroupItem>
                                        </MDBListGroup>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <Activity kcal={meal.kcal} />
                                    <MDBRow>
                                        <MDBCol style={{ padding: '2rem', maxWidth: '26rem', maxHeight: '26rem' }}>
                                            <Chart meal={meal} />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow center className='row-cols-1 row-cols-md-2 g-4' style={{ padding: '2rem' }}>
                                <MDBCol>
                                    <MealRec restaurantId={meal.restaurant_id} mealName={meal.name} />
                                </MDBCol>
                            </MDBRow>
                        </>
                    )}
        </>
    );
}

