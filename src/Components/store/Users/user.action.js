import { local_url } from "../../common/api";
import {
  ADD_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  EDIT_USER_SUCESS,
  ERROR,
  GET_USER,
  GET_USER_ADD_BY_MANAGER,
  GET_USER_BY_ID,
  LOADING,
  USER_LOGIN_SUCCESS,
} from "./users.type";
import axios from "axios";

// login action
export const login_action = (user_credentials) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let response = await axios.post(
      `${local_url}/authenticate_user`,
      user_credentials
    );
    return dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data.token,
      status: response.data.status,
      message: response.data.message,
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: ERROR,
      message: error.response.data.message,
      status: error.response.data.status,
    });
  }
};

//add new user
export const add_user_action = (creds, token) => async (dispatch) => {
  console.log("creds", creds);
  dispatch({ type: LOADING });
  try {
    console.log(creds, "------------->");
    let response = await axios.post(`${local_url}/create_user`, creds, {
      headers: { token: token },
    });
    return dispatch({
      type: ADD_USER_SUCCESS,
      status: response.data.status,
      message: response.data.message,
    });
  } catch (error) {
    console.log("add user error", error);
    return dispatch({
      type: ERROR,
      status: error.response.data.status,
      message: error.response.data.message,
    });
  }
};

//get all user
export const get_user_action = (token) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let response = await axios.get(`${local_url}/user_list`, {
      headers: { token: token },
    });
    return dispatch({
      type: GET_USER,
      status: response.data.status,
      payload: response.data.body,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      status: error.response.data.status,
      message: error.response.data.message,
    });
  }
};

//get user add by manager
export const get_user_by_manager = (token, id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let response = await axios.get(`${local_url}/user_list?id=${id}`, {
      headers: { token: token },
    });
    return dispatch({
      type: GET_USER_ADD_BY_MANAGER,
      status: response.data.status,
      message: response.data.message,
      payload: response.data.body,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      status: error.response.data.status,
      message: error.response.data.message,
    });
  }
};

//get user by id
export const get_user_by_id_action = (id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let response = await axios.get(`${local_url}/get_user/${id}`);
    return dispatch({
      type: GET_USER_BY_ID,
      status: response.data.status,
      payload: response.data.body,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      status: error.response.data.status,
    });
  }
};

//delete user
export const delete_user_action = (token, id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let response = await axios.delete(`${local_url}/delete_user/${id}`, {
      headers: { token: token },
    });
    return dispatch({
      type: DELETE_USER_SUCCESS,
      status: response.data.status,
      message: response.data.message,
      payload: id,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      status: error.response.data.status,
      message: error.response.data.message,
    });
  }
};

//edit user
export const edit_user_action = (token, data, id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    let response = await axios.patch(`${local_url}/edit_user/${id}`, data, {
      headers: { token: token },
    });
    console.log("edit response", response);
    return dispatch({
      type: EDIT_USER_SUCESS,
      status: response.data.status,
      message: response.data.message,
      payload: { id: id, data: data },
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      status: error.response.data.status,
      message: error.response.data.message,
    });
  }
};
