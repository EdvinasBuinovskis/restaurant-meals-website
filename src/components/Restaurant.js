/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap'
import image from '../images/image1.jpg';

export default function Restaurant(props) {
    const { restaurant } = props;
    return (
        <div key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}`}>
                <Card>
                    <CardImg top width="100%" src={image} alt="Failed to load image :/" />
                    <CardBody>
                        <CardTitle>{restaurant.name}</CardTitle>
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}
