/* eslint-disable react/prop-types */
import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default function Meal(props) {
    const { meal } = props;
    return (
        <div key={meal.id}>
            <ListGroupItem tag="a" href={`/meals/${meal.id}`} action>{meal.name}</ListGroupItem>
        </div>
    )
}
