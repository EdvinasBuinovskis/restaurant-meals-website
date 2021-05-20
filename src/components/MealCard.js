/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBRipple, MDBCol } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function MealCard(props) {
    const { meal } = props;
    return (
        <MDBCol key={meal._id}>
            <Link to={`/meals/${meal._id}`} style={{ color: "black", textDecoration: 'none' }}>
                <MDBCard style={{ maxWidth: '22rem' }} className='h-100'>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                        <MDBCardImage src={`${process.env.REACT_APP_IMG}${meal.image}`} fluid alt="Failed to load image :/" position="top" style={{ maxWidth: '30rem', maxHeight: '10rem' }} />
                        <a>
                            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                        </a>
                    </MDBRipple>
                    <MDBCardBody>
                        <MDBCardTitle>{meal.name}</MDBCardTitle>
                    </MDBCardBody>
                </MDBCard>
            </Link>
        </MDBCol>

    );
}