//styling & components
import './Navbar.css';
import Logo from '../assets/logo1.png';
import { Person, Power, Lock } from "react-bootstrap-icons";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ChangePassword from "./ChangePassword/ChangePassword";

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const handleChangePassword = () => {
        handleShow();
    }

    return (
        <div className='navbarMenu'>
            <div className='logo-map'>
                <img className='confLogo' src={Logo} alt="Logo" />
                { !authenticated && <Link className='home underline' to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>}

            </div>


            <div className='twoItems'>
                {

                    !authenticated && <Link className='home underline' target='_blank' to={adminUrl} style={{ color: "white", textDecoration: "none" }}>Admin</Link>
                }

                {

                    !authenticated && <Link className='home underline' to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
                }


                {
                    authenticated && (role == 2) && <Link className='home underline'  style={{ color: "white", textDecoration: "none" }}>Conferences</Link>
                }
                {
                    authenticated && <Link className='home underline'  style={{ color: "white", textDecoration: "none" }}>My conferences</Link>
                }
                {
                    authenticated &&  <Link className='home underline' style={{ color: "white", textDecoration: "none" }}>My profile</Link>
                }
                {
                    authenticated &&  <Link className='home underline' onClick={handleLogout} style={{ color: "white", textDecoration: "none" }}>LOGOUT</Link>
                }

            </div>

            <ChangePassword show={show} handleClose={handleClose} />
        </div>
    )
}
