import { createSlice } from "@reduxjs/toolkit";
import { selectUser } from "../utils/selector";

const initialState = {
    statusData: 'void',
    statusToken: 'void',
    token: null,
    data: null,
    error: null,
}

//action 

export function signOut(){
    return async (dispatch) => {
        localStorage.clear()
        sessionStorage.clear()
        dispatch(actions.reset())
    }
}

export function fetchUserData(token) {

    return async (dispatch, getState) => {
        const statusData = selectUser(getState()).statusData
        if (statusData === 'pending' || statusData === 'updating') {
            return;
        }
        if(statusData === 'rejected'){
            localStorage.clear()
            sessionStorage.clear()            
        }

        dispatch(actions.userDataFetching(token))

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', options)
            const data = await response.json()
            console.log(data)
            dispatch(actions.userDataResolved(data.body))
        } catch (error) {
            dispatch(actions.userDataRejected(error))
        }
    }
}

export function fetchUserToken(login) {

    return async (dispatch, getState) => {
        const statusToken = selectUser(getState()).statusToken
        if (statusToken === ' pending' || statusToken === 'updating') {
            return;
        }
        dispatch(actions.userTokenFetching())
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        }
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', options)
            const data = await response.json()

            if(response.status === 400){ console.log('invalid fields ') }
            dispatch(actions.userTokenResolved(data))
            console.log("test"+data.body.token)

            return data.body.token
        } catch (error) {
            dispatch(actions.userTokenRejected(error))
        }
    }
}

export function updateUserData(firstName, lastName, token) {
    return async (dispatch) => {
        const options = {
            method: 'PUT',
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({firstName , lastName}),
        }
        try{
            const response = fetch("http://localhost:3001/api/v1/user/profile", options)

            if(response.status === 400){ console.log('invalid fields ') }
            dispatch(actions.updateUserData( firstName, lastName, token))


        }catch (error){
            dispatch(actions)
        }
    }
}

// reducer 
const { actions, reducer } = createSlice({
    name: 'login',
    initialState,
    reducers: {
        userDataFetching: (draft) => {
            if (draft.statusData === undefined) {
                return initialState
            }
            if (draft.statusData === 'void') {
                draft.statusData = 'pending'
                return
            }
            if (draft.statusData === 'rejected') {
                draft.error = null
                draft.statusData = 'pending'
                return
            }
            if (draft.statusData === 'resolved') {
                draft.statusData = 'resolved'
                return
            }
            return
        },
        userDataResolved: (draft, action) => {
            if (draft.statusData === 'pending' || draft.statusData === 'updating') {
                draft.data = action.payload
                draft.statusData = 'resolved'
                return
            }
            return
        },
        userDataRejected: (draft, action) => {
            if (draft.statusData === 'pending' || draft.statusData === 'updating') {
                draft.error = action.payload
                draft.data = null
                draft.statusData = 'rejected'
                return
            }
            return
        },
        userTokenFetching: (draft) => {
            if (draft.statusToken === undefined) {
                return initialState
            }
            if (draft.statusToken === 'void') {
                draft.statusToken = 'pending'
                return
            }
            if (draft.statusToken === 'rejected') {
                draft.error = null
                draft.statusToken = 'pending'
                return
            }
            if (draft.statusToken === 'resolved') {
                draft.statusToken = 'resolved'
                return
            }
            return
        },
        userTokenResolved: (draft, action) => {
            if (draft.statusToken === 'pending' || draft.statusToken === 'updating') {
                draft.token = action.payload
                draft.statusToken = 'resolved'
                return
            }
            return
        },
        userTokenRejected: (draft, action) => {
            if (draft.statusToken === 'rejected') {
                draft.error = action.payload
                draft.token = null
                draft.statusToken = 'rejected'
                return
            }
            return
        },
        updateUserData: (draft, action) => {
            draft.data.firstName = action.payload.firstName;
            draft.data.lastName = action.payload.lastName;
            return
        },
        reset: () => {
            return initialState;
        }
    }

})


// on export chaque action individuellement 
export { actions }

// on export le reducer comme default export 
export default reducer