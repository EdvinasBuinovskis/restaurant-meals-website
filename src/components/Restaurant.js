/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// import React from 'react'
// import { Link } from 'react-router-dom';
// import { Card, CardBody, CardTitle } from 'reactstrap'

// export default function Restaurant(props) {
//     const { restaurant } = props;
//     return (
//         <div key={restaurant._id}>
//             <Link to={`/restaurants/${restaurant._id}`}>
//                 <Card>
//                     {/* <CardImg top src={restaurant.image} alt="Failed to load image :/" /> */}
//                     <img src={restaurant.image} alt="Failed to load image :/" width="300" height="300"></img>
//                     <CardBody>
//                         <CardTitle>{restaurant.name}</CardTitle>
//                     </CardBody>
//                 </Card>
//             </Link>
//         </div>
//     )
// }

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBRipple, MDBCol } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Restaurant(props) {
    const { restaurant } = props;
    return (
        <MDBCol key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}`} style={{ color: "black", textDecoration: 'none' }}>
                <MDBCard style={{ maxWidth: '22rem' }} className='h-100'>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                        <MDBCardImage src={`${process.env.REACT_APP_IMG}${restaurant.image}`} fluid alt="Failed to load image :/" position="top" />
                        <a>
                            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                        </a>
                    </MDBRipple>
                    <MDBCardBody>
                        <MDBCardTitle color="black">{restaurant.name}</MDBCardTitle>
                    </MDBCardBody>
                </MDBCard>
            </Link>
        </MDBCol>

    );
}
