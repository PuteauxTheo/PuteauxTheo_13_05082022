import { useSelector } from "react-redux"
import { Footer } from "../components/Footer"
import Header from "../components/Header"
import Transaction from "../components/Transaction"
import { selectUser } from "../utils/selector"

export default function User() {

    const user = useSelector(selectUser)
    console.log(user.data)

    const userName = <span className="username">{user.data.firstName} {user.data.lastName}</span>
    return (
        <div>
            <Header />
            <main className="main">
                <div className="header">
                    <h1>Welcome back<br />{userName}</h1>
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Transaction/>
            </main>
            <Footer />
        </div>
    )
}