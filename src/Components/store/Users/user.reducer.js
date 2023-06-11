import { ADD_USER_SUCCESS, DELETE_USER_SUCCESS, EDIT_USER_SUCESS, ERROR, GET_USER, GET_USER_ADD_BY_MANAGER, GET_USER_BY_ID, LOADING, LOGOUT_USER_SUCCESSFULL, USER_LOGIN_SUCCESS } from "./users.type"


const TOKEN = localStorage.getItem("token") || ""
const initial_state = {
    loading: false,
    error: false,
    token: TOKEN,
    data:[],
    details:{},
}


export const user_reducers = (state = initial_state, {type, payload}) => {
    switch(type){
        case LOADING:{
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case ERROR:{
            return{
                ...state,
                loading: false,
                error: true
            }
        }
        case USER_LOGIN_SUCCESS:{
            localStorage.setItem("token", payload)
            return{
                ...state,
                loading: false,
                error: false,
                token: payload
            }
        }
        case ADD_USER_SUCCESS:{
            return {
                ...state,
                loading: false,
                error: false
            }
        }
        case GET_USER:{
            return {
                ...state,
                loading: false,
                error: false,
                data:payload
            }
        }
        case DELETE_USER_SUCCESS:{
            let new_data = state.data.filter((user)=>user._id != payload)
            return {
                ...state,
                loading: false,
                error: false,
                data: new_data
            }
        }
        case GET_USER_ADD_BY_MANAGER:{
            return {
                ...state,
                loading: false,
                error: false,
                data:payload
            }
        }
        case GET_USER_BY_ID:{
            return {
                ...state,
                loading: false,
                error:false,
            }
        }
        case EDIT_USER_SUCESS:{
            let newData = state.data.filter((user)=>{
                if(user._id == payload.id){
                    return user = payload.data
                } else {
                    return user
                }
            })
            return {
                ...state,
                loading: false,
                error: false,
                data : newData
            }
        }
        case LOGOUT_USER_SUCCESSFULL:{
            localStorage.removeItem('token')
            return {
                ...state,
                loading: false,
                error: false,
                token: ""
            }
        }
        default:{
            return state
        }
    }
}