import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import Header from "../components/Header"
import { fetchUserData } from "../features/user"
import { selectUser } from "../utils/selector"

export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()




    // useEffect(() => {
    //     dispatch(fetchUserData)
    // }, [dispatch])


    const login = useSelector(selectUser);
    console.log(login)

    const handleSubmit = async e => {
        e.preventDefault();

        const login = { email, password }

        
        
        navigate('/login')
    }

    return (
        <div>
            <Header />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" onChange={e => setEmail(e.target.value)} id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={e => setPassword (e.target.value)} id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <Link to="/profile" className="sign-in-button">Sign In</Link>

                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
            <Footer/>
        </div>
    )
}