import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import Header from "../components/Header"
import { fetchUserData, fetchUserToken } from "../features/user"

export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [valideUser, setValideUser] = useState(true)


    const handleSubmit = async e => {
        e.preventDefault();

        const rememberme = document.getElementById("remember-me").checked
        console.log("est il checke ? "+rememberme)
        const login = { email, password }
        const token = await dispatch(fetchUserToken(login))

        if(!token){
            setValideUser(false)
            return
        }

        setValideUser(true)
        dispatch(fetchUserData(token))

        if(rememberme){
            localStorage.setItem('token', token)
            localStorage.setItem('rememberme', rememberme)
            localStorage.setItem('email', email)
        }else{
            console.log("value de rememberme "+rememberme)
            localStorage.setItem('rememberme', rememberme)
            sessionStorage.setItem('token', token)
        }

        
        navigate('/profile')
    }

    useEffect(() => {
    
        if (localStorage.getItem('email') && (localStorage.getItem('rememberme') === "true" )) {
            setEmail(localStorage.getItem('email'))
        }else{
            localStorage.removeItem('email')
        }
    },[])

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
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={e => setPassword (e.target.value)} id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>

                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                    { !valideUser && <div className="invalid-credentials"> Invalid credentials </div> }
                </section>
            </main>
            <Footer/>
        </div>
    )
}