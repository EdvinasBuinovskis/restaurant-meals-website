import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Restaurant from '../components/Restaurant';
import { listRestaurants } from '../redux/actions/restaurantActions';
import Search from '../components/Search';
import { MDBBtn, MDBCardGroup, MDBIcon } from 'mdb-react-ui-kit';

export default function RestaurantListScreen() {
    const dispatch = useDispatch();
    const restaurantList = useSelector(state => state.restaurantList);
    const { loading, error, restaurants } = restaurantList;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [searchTerm, setSearchTerm] = useState('');

    const filterRestaurants = () => {
        if (searchTerm === '') {
            return restaurants;
        }

        return restaurants.filter((restaurant) => {
            const restaurantName = restaurant.name.toLowerCase();
            const termToLow = searchTerm.toLowerCase();
            return restaurantName.includes(termToLow);
        });
    };

    useEffect(() => {
        dispatch(listRestaurants());
    }, [dispatch]);

    return (
        <>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <>
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            {
                                userInfo ? (
                                    <>
                                        {userInfo.isAdmin ? (
                                            <MDBBtn href="/restaurants/add" tag='a' color='none' className='m-1' >
                                                <MDBIcon fas className='ms-1' icon='plus' size='2x' />
                                            </MDBBtn>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                            <MDBCardGroup style={{ padding: '1rem' }}>
                                <div className="row center">
                                    {filterRestaurants().map(restaurant => (
                                        <Restaurant key={restaurant._id} restaurant={restaurant}></Restaurant>
                                    ))}
                                </div>
                            </MDBCardGroup>
                        </>
                    )}
        </>
    );
}