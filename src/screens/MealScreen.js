/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsMeal } from '../redux/actions/mealActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap';
import image from '../images/image1.jpg';
import Activity from '../components/Activity';


export default function MealScreen(props) {
    const dispatch = useDispatch();
    const mealId = props.match.params.id;
    const mealDetails = useSelector(state => state.mealDetails);
    const { loading, error, meal } = mealDetails;

    useEffect(() => {
        dispatch(detailsMeal(mealId));
    }, [dispatch, mealId]);

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <div>
                            <Link to="/meals">Go back</Link>
                            <Row>
                                <Col md={{ size: 4, offset: 1 }}>
                                    <Card>
                                        <CardImg top width="100%" src={image} alt="failed to load photo :/" />
                                        <CardBody>
                                            <CardTitle tag="h5">{meal.name}</CardTitle>
                                            <CardText tag="h6">Kcal: {meal.phone}</CardText>
                                            <CardText tag="h6">Protein:  {meal.address.zipcode}</CardText>
                                            <CardText tag="h6">Fat: {meal.address.geo.lat}</CardText>
                                            <CardText tag="h6">Carbs: {meal.address.geo.lng}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={{ size: 4, offset: 1 }}>
                                    <Activity />
                                </Col>
                            </Row>
                        </div>
                    )}
        </div>
    );
}