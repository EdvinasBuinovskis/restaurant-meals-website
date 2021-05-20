/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listFavorites, createFavorite, deleteFavorite } from '../redux/actions/favoriteActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function Favorite(props) {

    const { mealId } = props;
    const favoriteList = useSelector(state => state.favoriteList);
    const { loading, error, favorites } = favoriteList;

    const [isFavorite, setFavorite] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listFavorites());
    }, [dispatch]);

    useEffect(() => {
        if (favorites) {
            if (favorites.includes(mealId))
                setFavorite(true);
        }
    }, [favorites]);

    const addFavorite = () => {
        dispatch(createFavorite(mealId));
        setFavorite(true);
    }

    const removeFavorite = () => {
        dispatch(deleteFavorite(mealId));
        setFavorite(false);
    }

    return (
        <>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    // (
                    //     isFavorite ? (<Button onClick={() => removeFavorite()}>
                    //         {/* Pašalinti iš įsimintų */}
                    //         <MDBIcon className='ms-1' icon='heart' size='sm' />
                    //     </Button>) :
                    //         (<Button onClick={() => addFavorite()}>Pridėti prie įsimintų</Button>)
                    // )
                    (
                        isFavorite ? (
                            <MDBBtn onClick={() => removeFavorite()} tag='a' color='none' className='m-1' style={{ color: '#3b5998' }}>
                                <MDBIcon fas className='ms-1' icon='heart' size='2x' color='danger' />
                            </MDBBtn>
                        ) : (
                            <MDBBtn onClick={() => addFavorite()} tag='a' color='none' className='m-1' style={{ color: '#3b5998' }}>
                                <MDBIcon far className='ms-1' icon='heart' size='2x' color='danger' />
                            </MDBBtn>
                        )
                    )
            }
        </>
    )
}
