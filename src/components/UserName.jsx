import { useDispatch } from "react-redux"
import { useState } from "react"
import { updateUserData } from "../features/user"



export default function UserName({ user }) {

    const dispatch = useDispatch()
    const [editName, setEditName] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()


    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const cancel = async e => {
        e.preventDefault();
        setEditName(false)
    }
    const handleEditName = async e => {
        e.preventDefault();
        const name = { firstName, lastName }
        dispatch(updateUserData( name, token))

        setEditName(false)
        
    }

    return (

        editName ?
            <div className="header">
                <h1 className="username">Welcome Back</h1>
                <form className="form" onSubmit={handleEditName}>
                    <div className="form-input">
                        <input className="form-input-name" type="text" placeholder={user.data.firstName} onChange={e => setFirstName(e.target.value)}></input>
                        <input className="form-input-name" type="text" placeholder={user.data.lastName} onChange={e => setLastName(e.target.value)}></input>
                    </div>
                    <div className="form-button">
                        <button className="button" onClick={cancel}>Cancel</button>
                        <button className="button" type="submit">Save</button>
                    </div>
                </form>
            </div>
            :

            <div className="header">
                <h1 className="username">Welcome Back<br /><span >{user.data.firstName} {user.data.lastName}</span></h1>
                <button className="edit-button" onClick={() => setEditName(true)}>Edit name</button>
            </div>
    )
}