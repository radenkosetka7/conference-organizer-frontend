import React, {useState} from 'react';
import {Person, Pencil} from 'react-bootstrap-icons';
import {useDispatch, useSelector} from "react-redux";
import './UserDetails.css'
import {changePassword, updateUser} from "../../redux-store/userSlice";
import {errorCPass} from "../../constant/constants";
const UserDetails = () => {

    const {user} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isChangeMode, setIsChangeMode] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordMatchError('');
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        setPasswordMatchError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== newPassword) {
            setTimeout(() => {
                setPasswordMatchError(errorCPass);
            }, 3000);
            return;
        }

        dispatch(changePassword({ value: formData }));
        setIsChangeMode(false);
        setPassword('');
        setNewPassword('');
        setPasswordMatchError('');
    };


    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleDiscardClick = () => {
        setIsEditMode(false);
    };
    const handleChangeClick = () => {
        setIsChangeMode(true);
    };

    const handleChangeDiscardClick = () => {
        setIsChangeMode(false);
    };

    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username
    });
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveClick = () => {
        dispatch(updateUser({ value: formData }));
        setIsEditMode(false);
    };
    return (
        <div className="user-details-container">
            <div className="user-details">
                <div className="user-icon">
                    <Person size={48}/>
                </div>
                <div className="user-info">
                    <h2>User Details</h2>
                    {isEditMode && !isChangeMode && (
                        <div>
                            <div className="form-row">
                                <div className="form-label">
                                    <label>
                                        <strong>Firstname:</strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="first_name" defaultValue={user.first_name}
                                    value={formData.first_name} onChange={handleChange} readOnly={false}/>
                                </div>
                            </div>


                                <div className="form-row">
                                    <div className="form-label">
                                        <label>
                                            <strong>Lastname: </strong>
                                        </label>
                                    </div>
                                    <div className="form-input">
                                        <input type="text"  name="last_name" defaultValue={user.last_name}
                                        value={formData.last_name} onChange={handleChange} readOnly={false}/>
                                    </div>
                                </div>

                            <div className="form-row">
                                <div className="form-label">
                                    <label><strong>E-mail: </strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="email" defaultValue={user.email}
                                    value={formData.email} onChange={handleChange} readOnly={false}/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-label">
                                    <label><strong>Username: </strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="username" defaultValue={user.username}
                                    value={formData.username} onChange={handleChange} readOnly={false}/>
                                </div>
                            </div>

                        </div>)}
                    {!isEditMode && !isChangeMode && (
                        <div>
                            <p>
                                <strong>Firstname:</strong> {user.first_name}
                            </p>
                            <p>
                                <strong>Lastname:</strong> {user.last_name}
                            </p>
                            <p>
                                <strong>E-mail:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Username:</strong> {user.username}
                            </p>
                        </div>
                    )}
                    {!isEditMode && isChangeMode && (

                        <div>
                            <div className="form-row">
                                <div className="form-label">
                                    <label>
                                        <strong>Old password:</strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="first_name" type="password" required
                                           onChange={handlePasswordChange} readOnly={false}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label">
                                    <label>
                                        <strong>New password:</strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="first_name" type="password"
                                           onChange={handlePasswordChange} readOnly={false}/>
                                </div>
                            </div>


                            <div className="form-row">
                                <div className="form-label">
                                    <label>
                                        <strong>Repeated password: </strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="repeated_password" type="password"
                                           onChange={handleNewPasswordChange}  readOnly={false}/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {!isEditMode && !isChangeMode && (
                    <div className="edit-button">
                        <button onClick={handleEditClick}>
                            Edit
                        </button>
                    </div>
                )}
                {!isEditMode && !isChangeMode && (
                    <div className="change-button">
                        <button onClick={handleChangeClick}>
                            Change password
                        </button>
                    </div>
                )}
                {isEditMode && !isChangeMode && (
                    <div className="edit-buttons">
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleDiscardClick}>Discard</button>
                    </div>
                )}
                {!isEditMode && isChangeMode && (
                    <div className="edit-buttons">
                        <button onClick={handleSubmit}>Save</button>
                        <button onClick={handleChangeDiscardClick}>Discard</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
