import React, {useEffect, useState} from 'react';
import {Person, Pencil} from 'react-bootstrap-icons';
import {useDispatch, useSelector} from "react-redux";
import './UserDetails.css'
import {changePassword, updateUser} from "../../redux-store/userSlice";

const UserDetails = () => {

    const {user} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isChangeMode, setIsChangeMode] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isNameLastValid, setIsLastNameValid] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
    const [showErrorMessagePass, setShowErrorMessagePass] = useState(false);


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (password !== "") {
            setShowErrorMessagePass(false);
        }
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        if (newPassword !== "") {
            setShowErrorMessagePass(false);
        }
    };

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
        if (oldPassword !== "") {
            setShowErrorMessagePass(false);
        }
    }


    useEffect(() => {
        checkValidity();
    }, [name, email, username, lastName]);

    useEffect(() => {
        checkValidityPassword();
    }, [oldPassword, newPassword, password]);

    const checkValidityPassword = () => {
        const isOldPassValid = oldPassword.trim() !== "";
        setIsOldPasswordValid(isOldPassValid);


        const isPassValid = password.trim().length > 7;
        setIsPasswordValid(isPassValid);

        const isNewPassValid = newPassword.trim().length > 7;
        setIsNewPasswordValid(isNewPassValid);

        const equality = password === newPassword;
        setPasswordMatch(equality);

        if (isOldPasswordValid && isPasswordValid && isNewPasswordValid && passwordMatch) {
            setShowErrorMessagePass(false);
        } else {
        }
    };


    const handleEditClick = () => {
        setIsEditMode(true);
    };
    const validateEmail = (email) => {
        const isEmailValid1 = email.trim() !== "";
        setIsEmailValid(isEmailValid1);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const checkValidity = () => {
        const isImeValid1 = name.trim() !== "";
        setIsNameValid(isImeValid1);

        const isValid = validateEmail(email);
        setIsEmailValid(isValid);


        const isUsernameValid1 = username.trim() !== "";
        setIsUsernameValid(isUsernameValid1);

        const isLastNameValid1 = lastName.trim() !== "";
        setIsLastNameValid(isLastNameValid1);

        if (isImeValid1 && isValid && isUsernameValid1 && isLastNameValid1) {
            setShowErrorMessage(false);
        } else {
        }
    };

    const handleDiscardClick = () => {
        setEmail(user.email);
        setName(user.first_name);
        setLastName(user.last_name);
        setUsername(user.username);
        setIsEditMode(false);
    };
    const handleChangeClick = () => {
        setIsChangeMode(true);
    };

    const handleChangeDiscardClick = () => {
        setEmail(user.email);
        setName(user.first_name);
        setLastName(user.last_name);
        setUsername(user.username);
        setIsChangeMode(false);
    };

    const handleSaveClick = () => {
        checkValidity()
        if (isUsernameValid && isNameValid && isEmailValid && isNameLastValid) {
            const data = {
                username: username,
                first_name: name,
                email: email,
                last_name: lastName
            };
            dispatch(updateUser({value: data}));
            setIsEditMode(false);
        } else {
            setShowErrorMessage(true);
            setIsEmailValid(false);
            setIsNameValid(false);
            setIsUsernameValid(false);
            setIsLastNameValid(false);
        }
    };
    const handleSubmitPass = () => {
        checkValidityPassword();

        if (isOldPasswordValid && isPasswordValid && isNewPasswordValid && passwordMatch) {
            const data = {
                password: password,
                password_repeated: newPassword,
                old_password: oldPassword,
            };
            dispatch(changePassword({value: data}));
            setIsChangeMode(false);
            setPassword('');
            setNewPassword('');
            setOldPassword('');
        } else {
            setShowErrorMessagePass(true);
            setIsPasswordValid(false);
            setIsNewPasswordValid(false);
            setIsOldPasswordValid(false);
        }
    };

    return (
        <div className="user-details-container">
            <div className="user-details">
                <div className="user-icon">
                    <Person size={60}/>
                </div>
                <div className="user-info">
                    <h2>User Details</h2>
                    {showErrorMessage && (
                        <p className="errorMessage">Check inputs!</p>
                    )}
                    {showErrorMessagePass && (
                        <p className="errorMessage">Check inputs!</p>
                    )}
                    {isEditMode && !isChangeMode && (
                        <div>
                            <div className="form-row">
                                <div className="form-label">
                                    <label>
                                        <strong>Firstname:</strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="first_name"
                                           value={name} onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="form-row">
                                <div className="form-label">
                                    <label>
                                        <strong>Lastname: </strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="last_name"
                                           value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-label">
                                    <label><strong>E-mail: </strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="email"
                                           value={email} onChange={(e) => setEmail(e.target.value)}
                                           pattern=".+@.+\..+"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-label">
                                    <label><strong>Username: </strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="username"
                                           value={username} onChange={(e) => setUsername(e.target.value)}/>
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
                                    <input type="text" name="old_password" type="password"
                                           onChange={handleOldPasswordChange}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label">
                                    <label>
                                        <strong>New password:</strong>
                                    </label>
                                </div>
                                <div className="form-input">
                                    <input type="text" name="new_password" type="password"
                                           onChange={handlePasswordChange}/>
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
                                           onChange={handleNewPasswordChange}/>
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
                        <button onClick={handleSubmitPass}>Save</button>
                        <button onClick={handleChangeDiscardClick}>Discard</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
