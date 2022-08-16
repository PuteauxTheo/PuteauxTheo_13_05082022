import { Link } from 'react-router-dom'
import argentBank from './../assets/argentBankLogo.png'

export default function Header() {

    
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    function signOut(){
        localStorage.clear()
        sessionStorage.clear()        
    }

    return (

        token ? 
        
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={argentBank} alt="Argent Bank Logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className="main-nav-item" to="/" onClick={signOut}>
                    <i className="fa fa-user-circle"></i>
                    Sign out
                </Link>
            </div>
        </nav>
        :
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={argentBank} alt="Argent Bank Logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </div>
        </nav>

    )
}