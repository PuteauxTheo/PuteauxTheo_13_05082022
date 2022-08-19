import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../features/user'
import { selectUser } from '../utils/selector'
import argentBank from './../assets/argentBankLogo.png'

export default function Header() {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    function signOut() {
        sessionStorage.clear()
        dispatch(actions.reset())
    }

    return (

        token && user.data ?

            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={argentBank} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link to='/profile' className='main-nav-item'>
                        <i className="fa fa-user-circle"></i>
                        {user.data.firstName}
                    </Link>
                    <Link className="main-nav-item" to="/" onClick={signOut}>
                        <i className="fa fa-sign-out"></i>
                        Sign out
                    </Link>
                </div>
            </nav>
            :
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={argentBank} alt="Argent Bank Logo" />
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