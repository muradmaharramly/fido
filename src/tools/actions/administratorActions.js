export const setAdministrators = (administrators) => ({
    type: "SET_ADMINISTRATORS",
    payload: administrators,
});

export const setAdministratorCount = (count) => ({
    type: "SET_ADMINISTRATOR_COUNT",
    payload: count,
});

export const setAdminLoading = (loading) => ({
    type: "SET_ADMIN_LOADING",
    payload: loading,
});

export const setAdminError = (error) => ({
    type: "SET_ADMIN_ERROR",
    payload: error,
});

export const logoutAdmin = () => ({
    type: "LOGOUT_ADMIN",
});

export const addAdministrator = (administrator) => ({
    type: "ADD_ADMINISTRATOR",
    payload: administrator,
});

export const editAdministrator = (updatedAdministrator) => ({
    type: "EDIT_ADMINISTRATOR",
    payload: updatedAdministrator,
});

export const updateUserProfile = (formData) => ({
    type: "UPDATE_USER_PROFILE",
    payload: formData,
});

export const loginAdminSuccess = (admin) => ({
    type: "LOGIN_ADMIN_SUCCESS",
    payload: admin,
});

export const loginAdminFail = (error) => ({
    type: "LOGIN_ADMIN_FAIL",
    payload: error,
});
