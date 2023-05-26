import base from './base.service';

const instance = base.service(true);
export const changePassword = (changePasswordData) => {
    return instance
        .patch(`users/change_password/`, changePasswordData)
        .then((results) => results);
}
export const status = () => {
    return instance
        .get(`users/status/`)
        .then((results) => results.data);
}

export const updateUser = (dataToUpdate) => {
    return instance
        .put('users/status/', dataToUpdate)
        .then((result) => result.data);
};
export const staff = () => {
    return instance
        .get('users/staff/')
        .then((results)=>results.data)
}

export const resetPassword = () => {
    return instance
        .get('users/reset_password/')
        .then((results)=>results.data)
}
const user = {
    changePassword,
    status,
    staff,
    resetPassword,
    updateUser
}
export default user;
