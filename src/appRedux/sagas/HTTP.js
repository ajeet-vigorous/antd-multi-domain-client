import axios from "axios";
import CryptoJS from "crypto-js";
import { decryptedDataFlag, encruptedDataFlag } from '../../constants/global'
import settings from "../../domainConfig";

export const CONST = {

    BACKEND_URL: settings?.apiurl,
    SOCKET_URL: settings?.SOCKET_URL

};

function authHeader() {
    let user = JSON.parse(localStorage.getItem('user_id_tvs99'));
    if (user && user.data && user.data.userType !== 'client') {
        localStorage.clear();
        window.location.href = '/signin'

      }
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export let apiCall = async (method, path, payload) => {


    try {
        const response = await axios({
            method,
            url: CONST.BACKEND_URL + path,
            data: payload,
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
        });

        if (response && response.data && response.data.dataEncrupt && response.data.dataEncrupt == true) {
            if (response.data) {
                let encruptedData = response.data.data
                const bytes = CryptoJS.AES.decrypt(encruptedData, process.env.REACT_APP_SECRET_KEY
                );
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                if (decryptedData && decryptedData!=null && decryptedData!=""  ) {
                    response.data.data = JSON.parse(decryptedData) 
                }
            }
        }

        return response;

    } catch (error) {
        if (error?.response.data.code == 3 || error?.response.status == 401) {
            localStorage.clear();
            window.location.href = '/signin'
        }
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw error.response;
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(error.message);
        }
    }
};
