import './Navbar.css';
import Logo from '../assets/logo1.png';

//redux, state & router
import { Link, useNavigate } from 'react-router-dom';
import { logout, status } from '../redux-store/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);
    const [show, setShow] = useState(false);
    const { authenticated, role } = useSelector((state) => state.users);

    const adminUrl = `${window.location.protocol}//${window.location.hostname}:8000/admin`;

    useEffect(() => {
        dispatch(status());
    }, [dispatch]);

    const handleShow = () => setShow(true);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
    
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    }

    return (
        <div className='navbarMenu'>
            <div className='logo-map'>
                <img className='confLogo' src={Logo} alt="Logo" />
                {!authenticated && (
                    <Link
                        className={`home underline ${activeLink === 'home' ? 'active' : ''}`}
                        to="/"
                        onClick={() => handleLinkClick('home')}
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Home
                    </Link>
                )}
            </div>

            <div className='twoItems'>
                {!authenticated && (
                    <Link
                        className={`home underline ${activeLink === 'admin' ? 'active' : ''}`}
                        target='_blank'
                        to={adminUrl}
                        onClick={() => handleLinkClick('admin')}
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Admin
                    </Link>
                )}

                {!authenticated && (
                    <Link
                        className={`home underline ${activeLink === 'login' ? 'active' : ''}`}
                        to="/login"
                        onClick={() => handleLinkClick('login')}
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Login
                    </Link>
                )}

                {authenticated && role == 2 && (
                    <Link
                        className={`home underline ${activeLink === 'conferences' ? 'active' : ''}`}
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={() => handleLinkClick('conferences')}
                    >
                        Conferences
                    </Link>
                )}

                {authenticated && (
                    <Link
                        className={`home underline ${activeLink === 'myConferences' ? 'active' : ''}`}
                        to="/allConferences"
                        onClick={() => handleLinkClick('myConferences')}
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        My conferences
                    </Link>
                )}

                {authenticated && (
                    <Link
                        className={`home underline ${activeLink === 'myProfile' ? 'active' : ''}`}
                        to="/myProfile"
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={() => handleLinkClick('myProfile')}
                    >
                        My profile
                    </Link>
                )}

                {authenticated && (
                    <Link
                        className={`home underline ${activeLink === 'logout' ? 'active' : ''}`}
                        to="/"
                        onClick={() => {
                            handleLogout();
                            handleLinkClick('logout');
                        }}
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        LOGOUT
                    </Link>
                )}
            </div>
        </div>
    )
}
