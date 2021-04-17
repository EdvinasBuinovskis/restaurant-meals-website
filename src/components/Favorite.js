/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
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
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        isFavorite ? (<Button onClick={() => removeFavorite()}>Remove</Button>) :
                            (<Button onClick={() => addFavorite()}>Add</Button>)
                    )}
        </div>
    )
}
