const initialState = {
    administrators: [],
    administratorCount: 0,
    error: null,
    message: null,
    loading: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ADMIN_LOADING":
            return { ...state, loading: action.payload };

        case "SET_ADMINISTRATORS":
            return { ...state, loading: false, administrators: action.payload };

        case "ADD_ADMINISTRATOR":
            return { ...state, administrators: [...state.administrators, action.payload] };

        case "EDIT_ADMINISTRATOR":
            return {
                ...state,
                administrators: state.administrators.map((admin) =>
                    admin.id === action.payload.id ? action.payload : admin
                ),
            };
        case "UPDATE_USER_PROFILE":
            return {
                ...state,
                administrators: state.administrators.map((admin) =>
                    admin.id === action.payload.id ? action.payload : admin
                ),
            };

        case "LOGIN_ADMIN_SUCCESS":
            return { ...state, error: null, message: "Admin girişi uğurlu oldu!" };

        case "LOGIN_ADMIN_FAIL":
            return { ...state, error: action.payload, message: null };

        case "SET_ADMINISTRATOR_COUNT":
            return { ...state, administratorCount: action.payload };

        case "SET_ADMIN_ERROR":
            return { ...state, error: action.payload, loading: false };

        case "LOGOUT_ADMIN":
            return { ...state, administrators: [], error: null, message: null };

        default:
            return state;
    }
};

export default adminReducer;
