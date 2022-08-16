import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import Header from "../components/Header"
import Transaction from "../components/Transaction"
import UserName from "../components/UserName"
import { actions, fetchUserData } from "../features/user"
import { selectUser } from "../utils/selector"

export default function User() {

    const user = useSelector(selectUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')



    useEffect(() => {
        if (token && user) {
            dispatch(fetchUserData(token))
            navigate('/profile')

        } else {
            localStorage.clear()
            sessionStorage.clear()
            navigate('/')
            dispatch(actions.reset())
        }
    }, [dispatch, navigate, token, user])

    if (!user.data) {
        return null;
    }

    return (
        <div>
            <Header />
            <main className="main">
                <UserName user={user}/>
                <h2 className="sr-only">Accounts</h2>
                <Transaction accountTitle="Argent Bank Checking (x8349)" accountAmount="$2,082.79" accountAmountDescription="Available Balance" />
                <Transaction accountTitle="Argent Bank Savings (x6712)" accountAmount="$10,928.42" accountAmountDescription="Available Balance" />
                <Transaction accountTitle="Argent Bank Credit Card (x8349)" accountAmount="$184.30" accountAmountDescription="Current Balance" />
            </main>
            <Footer />
        </div>
    )
}