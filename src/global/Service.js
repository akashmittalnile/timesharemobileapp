//import : react components
import {Alert} from 'react-native';
//third parties
//import : axios
import axios from 'axios';
import Toast from 'react-native-simple-toast';
//endpoint : base_url
const isProduction = true;
export const BASE_URL = isProduction
  ? `http://35.155.124.107/api/`
  : `https://nileprojects.in/timesharesimplified/api/`;
//endpoint : endpoints user
export const LOGIN = `users/login`;
export const SOSALLOGIN = `users/socialLogin`;
export const LOGOUT = `users/logout`;
export const REGISTER = `users/register`;
export const PROFILE = `users/profile`;
export const UPDATE_PROFILE = `users/update_profile`;
export const STATUS = `status`;
export const CREATED_BY = `created_by`;
export const ALL_DEVELOPERS = `developers/all-developers`;
export const New_ALL_DEVELOPERS = `developers/users_all-developers`;
export const ADD_CONTRACT = `developercontracts/add-contract`;
export const GET_CONTRACTS = `developercontracts/get-contracts`;
export const VIDEOS = `videos`;
export const GET_PROFILE = `users/profile`;
export const HELP_AND_SUPPORTS = `help-and-supports`;
export const SUBMIT_NEW_QUERY = `support/new-query`;
export const SIDE_MENU = `users/app-menu`;
export const CHECK_TOKEN_EXPIRY = `users/check-login`;
export const COUPON_VALIDATE = `coupon-validate`;
export const SIGN_CONTRACT_AGREEMENT = `developercontracts/sign-contract-agreement`;
export const GET_NOTIFICATION = `notification/get-notification`;
export const SEND_OTP = `users/sendotp`;
export const VERIFY_OTP = `users/verifyotp`;
export const RESEND_OTP = `users/changepassword`;
export const CHANGE_PASSWORD = `users/changepassword`;
export const GET_PREFILL_DATA = `users/sign-agreement`;
export const CHECK_NAME = `users/check-name`;
export const CHECK_EMAIL = `users/check-email`;
export const CHECK_CONTACT = `users/check-contact`;
export const GET_OWNERSHIP_LEVEL = `developers/developer-ownership-level`;
export const Add_user_devlopers='users/add_user_devlopers'
export const EnrolledData='developers/developer-enroll-data/'
export const DevloperWeekData='developers/developer-week-data'
export const Users_update_contact='users/update-contact'
export const developers_category='developers/category-by-developer/'
//function : post API
export const postAPI = async (endPoint, postData, token = '') => {
  const url = BASE_URL + endPoint;
  return await axios
    .post(url, postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return {
        response: response?.data,
        status: response?.data?.status,
        msg: response?.data?.msg,
      };
    })
    .catch(error => {
      return {
        response: error,
        status: false,
        msg: error.response.data.msg,
      };
    });
};
//function :  get api
export const getApi = endPoint =>
  axios
    .get(`${BASE_URL}${endPoint}`)
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(error);
      if (error?.response?.status === 422) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
        console.log(error.response.headers);
      } else if (error?.response?.status === 404) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else if (error?.response?.status === 401) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else if (error?.response?.status === 500) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      }
    });
//function :  get api with token
export const getApiWithToken = (token, endPoint) =>
  axios
    .get(`${BASE_URL}${endPoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error?.response?.status === 422) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
        console.log(error.response.headers);
      } else if (error?.response?.status === 404) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else if (error?.response?.status === 401) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else if (error?.response?.status === 500) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      }
    });
//function :  post api
export const postApi = (endPoint, data) =>
  axios
    .post(`${BASE_URL}${endPoint}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log('error', error, data, `${BASE_URL}${endPoint}`);
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('header', error.response.headers);
      if (error?.response?.status === 422) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 404) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 401) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 500) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 0) {
        // Alert.alert(
        //   '',
        //   `Internet connection appears to be offline. Please check your internet connection and try again.`,
        // );
        Toast.show(
          'Internet connection appears to be offline. Please check your internet connection and try again.',
          Toast.SHORT,
        );
      } else {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      }
    });

//function : post api with token
export const postApiWithToken = (token, endPoint, data) =>
  axios
    .post(`${BASE_URL}${endPoint}`, data, {
      headers:
        Object.keys(data).length > 0
          ? {
              'Content-Type': 'multipart/form-data',
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
            }
          : {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log('error', error);
      if (error?.response?.status === 422) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
        console.log(error.response.headers);
      } else if (error?.response?.status === 404) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 401) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 500) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log(
          'error status',
          error?.response?.status,
          `${BASE_URL}${endPoint}`,
        );
        console.log('error message', error.response.data.message);
      } else {
        // Alert.alert('', `${error}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      }
    });
//function : post api with json data
export const postJsonApiWithToken = (token, endPoint, data) =>
  axios
    .post(`${BASE_URL}${endPoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error?.response?.status === 422) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
        console.log(error.response.headers);
      } else if (error?.response?.status === 404) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else if (error?.response?.status === 401) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else if (error?.response?.status === 500) {
        // Alert.alert('', `${error.response.data.message}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      } else {
        // Alert.alert('', `${error}`);
        Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
      }
    });
