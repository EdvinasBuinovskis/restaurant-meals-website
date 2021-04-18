/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap'

export default function Restaurant(props) {
    const { restaurant } = props;
    return (
        <div key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}`}>
                <Card>
                    {/* <CardImg top src={restaurant.image} alt="Failed to load image :/" /> */}
                    <img src={restaurant.image} alt="Failed to load image :/" width="300" height="300"></img>
                    <CardBody>
                        <CardTitle>{restaurant.name}</CardTitle>
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}
