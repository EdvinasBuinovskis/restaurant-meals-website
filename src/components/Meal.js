/* eslint-disable react/prop-types */
import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default function Meal(props) {
    const { meal } = props;
    return (
        <div key={meal._id}>
            <ListGroupItem tag="a" href={`/meals/${meal._id}`} action>
                {meal.name}
                {meal.approved ? <MDBIcon className='ms-1' icon='check' size='sm' /> :
                    <div></div>
                }
            </ListGroupItem>
        </div>
    )
}
