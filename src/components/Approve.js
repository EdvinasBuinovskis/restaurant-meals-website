/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { approveMeal } from '../redux/actions/mealActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function Favorite(props) {

    const { mealId } = props;

    const mealApprove = useSelector(state => state.mealApprove);
    const { loading, success, error } = mealApprove;

    const [isApproved, setApproved] = useState(props.isApproved);

    const dispatch = useDispatch();

    const updateApproved = () => {
        dispatch(approveMeal(mealId));
        setApproved(!isApproved);
    }

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        isApproved ? (<Button onClick={() => updateApproved()}>Pašalinti patvirtinimą</Button>) :
                            (<Button onClick={() => updateApproved()}>Patvirtinti</Button>)
                    )}
        </div>
    )
}
