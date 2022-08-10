import { createSlice } from "@reduxjs/toolkit";
import { selectUser } from "../utils/selector";

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

//action 
export async function fetchUserData() {

    return async (dispatch, getState) => {
        const status = selectUser(getState()).status
        if (status === 'pending' || status === 'updating') {
            return;
        }
        dispatch(action.fetching())
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login')
            const data = await response.json()
            dispatch(action.resolved(data))
        } catch (error) {
            dispatch(action.rejected(error))
        }
    }


}

// reducer 
const { action, reducer } = createSlice({
    name: 'login',
    initialState,
    reducers: {
        fetching: (draft) => {
            if (draft.status === undefined) {
                return initialState
            }
            if (draft.status === 'void') {
                draft.status = 'pending'
                return
            }
            if (draft.status === 'rejected') {
                draft.error = null
                draft.status = 'pending'
                return
            }
            if (draft.status === 'resolved') {
                draft.status = 'resolved'
                return
            }
            return
        },
        resolved: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.data = action.payload
                draft.status = 'resolved'
                return
            }
            return
        },
        rejected: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.error = action.payload
                draft.data = null
                draft.status = 'rejected'
                return
            }
            return
        }
    }

})


// on export chaque action individuellement 
export { action }

// on export le reducer comme default export 
export default reducer