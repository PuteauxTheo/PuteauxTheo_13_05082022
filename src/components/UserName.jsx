//import { useDispatch } from "react-redux"
import { useState } from "react"



export default function UserName({ user }) {

    //const dispatch = useDispatch()
    const [editName, setEditName] = useState(false)

    console.log(editName)

    const userName = <span >{user.data.firstName} {user.data.lastName}</span>

    const handleEditName = async e => {
        e.preventDefault();


    }
    return (

        editName ?
            <div className="header">
                <h1 className="username">Welcome Back</h1>
                <form className="form" onSubmit={handleEditName}>
                    <div className="form-input">
                        <input className="form-input-name" type="text" placeholder={user.data.firstName} ></input>
                        <input className="form-input-name" type="text" placeholder={user.data.lastName} ></input>
                    </div>
                    <div className="form-button">
                        <button className="button">Cancel</button>
                        <button className="button">Save</button>
                    </div>
                </form>
            </div>
            :

            <div className="header">
                <h1 className="username">Welcome back<br />{userName}</h1>
                <button className="edit-button" onClick={() => setEditName(true)}>Edit name</button>
            </div>
    )
}