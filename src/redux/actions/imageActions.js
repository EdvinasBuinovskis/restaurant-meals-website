import Axios from "axios";
import { IMAGE_UPLOAD_FAIL, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS } from "../constants/imageConstant";

export const uploadImage = (base64EncodedImage) => async (dispatch, getState) => {
    dispatch({ type: IMAGE_UPLOAD_REQUEST, payload: { base64EncodedImage } });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.post('/api/uploads', JSON.stringify({ data: base64EncodedImage }), {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: IMAGE_UPLOAD_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};
