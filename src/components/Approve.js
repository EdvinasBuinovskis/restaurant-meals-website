/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
        window.location.reload(false);
    }

    return (
        <>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    // (
                    //     isApproved ? (<Button onClick={() => updateApproved()}>Pašalinti patvirtinimą</Button>) :
                    //         (<Button onClick={() => updateApproved()}>Patvirtinti</Button>)
                    // )
                    isApproved ? (
                        <MDBBtn onClick={() => updateApproved()} tag='a' color='none' className='m-1' style={{ color: '#3b5998' }}>
                            <MDBIcon far className='ms-1' icon='thumbs-down' size='2x' />
                        </MDBBtn>
                    ) : (
                        <MDBBtn onClick={() => updateApproved()} tag='a' color='none' className='m-1' style={{ color: '#3b5998' }}>
                            <MDBIcon far className='ms-1' icon='thumbs-up' size='2x' />
                        </MDBBtn>
                    )
            }
        </>
    )
}